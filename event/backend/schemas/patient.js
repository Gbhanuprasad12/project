const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const Patient = require('../models/patient');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment')
const secretkey = "bhanu";
const secretkey1 = "sai"
const PatientType = new GraphQLObjectType({
  name: 'Patient',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    contact: { type: GraphQLString },
  }),
});
const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});
const AppointmentType = new GraphQLObjectType({
  name: 'Appointment',
  fields: () => ({
    id: { type: GraphQLID },
    patientName: { type: GraphQLString },
    doctor: { type: GraphQLString },
    date: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});
const AdminType = new GraphQLObjectType({
  name: 'Admin',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
  }),
});

// Patient Queries
const patientQueries = {
  patient: {
    type: PatientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Patient.findById(args.id);
    },
  },
  patients: {
    type: new GraphQLList(PatientType),
    resolve() {
      return Patient.find();
    },
  },
  loginPatient: {
    type: AuthPayload, // with fields id, name, contact, token
    args: {
      name: { type: GraphQLString },
      contact: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Patient.findOne({ name: args.name, contact: args.contact }).then((patient) => {
        if (!patient) throw new Error("Invalid credentials");
  
        const token = jwt.sign(
          { id: patient.id, name: patient.name, contact: patient.contact },
          secretkey1,
          { expiresIn: '1h' }
        );
  
        return {
          id: patient.id,
          name: patient.name,
          contact: patient.contact,
          token,
        };
      });
    }
  },
  
  
};

// Admin Queries
const adminQueries = {
  admin: {
    type: AdminType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Admin.findById(args.id);
    },
  },
  admins: {
    type: new GraphQLList(AdminType),
    resolve() {
      return Admin.find();
    },
  },
  appointments: {
    type: new GraphQLList(AppointmentType),
    resolve() {
      return Appointment.find();
    },
  },
  loginAdmin: {
    type: AuthPayload,
    args: {
      name: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(parent, args) {
      // Find admin by name and contact
      return Admin.findOne({ name: args.name, contact: args.contact }).then((admin) => {
        if (!admin) {
          throw new Error('Admin not found or incorrect credentials');
        }

        // Generate JWT token after successful login
        const token = jwt.sign(
          { id: admin.id, name: admin.name, contact: admin.contact },
          secretkey,  // Secret key (use an environment variable for security)
          { expiresIn: '1h' } // Expiration time of 1 hour
        );

        // Return admin data along with the generated token
        return {
          ...admin.toObject(),
          token, // Add the token to the response
        };
      });
    },
  },
};


// Patient Mutations
const patientMutations = {
  addPatient: {
    type: PatientType,
    args: {
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      gender: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(parent, args) {
      const patient = new Patient(args);
      return patient.save();
    },
  },
  deletePatient: {
    type: PatientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Patient.findByIdAndDelete(args.id);
    },
  },
  bookAppointment: {
    type: AppointmentType,
    args: {
      patientName: { type: GraphQLString },
      doctor: { type: GraphQLString },
      date: { type: GraphQLString },
    },
    resolve(parent, args) {
      const appointment = new Appointment({
        patientName: args.patientName,
        doctor: args.doctor,
        date: args.date,
      });
      return appointment.save();
    },
  },
  
};

// Admin Mutations
const adminMutations = {
  addAdmin: {
    type: AdminType,
    args: {
      name: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(parent, args) {
      const admin = new Admin(args);
      return admin.save();
    },
  },
  deleteAdmin: {
    type: AdminType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Admin.findByIdAndDelete(args.id);
    },
  },
  deletePatient: {
    type: PatientType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Patient.findByIdAndDelete(args.id);
    }
  }
  
};

module.exports = {
  patientQueries,
  patientMutations,
  adminQueries,
  adminMutations,
};
