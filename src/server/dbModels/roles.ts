import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    role_name: { type: String, required: true },
    role_description: { type: String },
    permissionsNote: { type: String },

    trip: {
      createSubmit: { type: Boolean, default: false },
      view: { 
        type: String, 
        enum: ["None", "My Trip", "Policy Trip", "All Company Trips"], 
        default: "None" 
      },
      approve: { 
        type: String, 
        enum: ["Director", "Manager", "All", "None"], 
        default: "Director" 
      },
      close: { type: Boolean, default: false },
      archive: { type: Boolean, default: false },
      reopen: { type: Boolean, default: false },
    },

    travel_documents: {
      addModify: { type: Boolean, default: false },
      allCompanyAccess: { 
        type: String,
        enum: ["None", "No Access", "Only View Access", "Add and Modify Access"],
        default: "None"
      },
    },

    expense_report: {
      createSubmit: { type: Boolean, default: false },
      view: { 
        type: String, 
        enum: ["None", "My Expense Report", "Policy Expense Report", "All Company Expense Report"], 
        default: "None" 
      },
      approve: { 
        type: String, 
        enum: ["None", "Director", "Manager", "All"], 
        default: "None" 
      },
      approveViolations: { type: Boolean, default: false },
      modifySubmitted: { type: Boolean, default: false },
      reimburse: { type: Boolean, default: false },
      share: { type: Boolean, default: false },
      archive: { type: Boolean, default: false },
      editAfterExport: { type: Boolean, default: false },
      preventExpenseCreationParent: { type: Boolean, default: false },
      preventExchangeOverwrite: { type: Boolean, default: false },
    },

    cards: {
      view: { 
        type: String, 
        enum: ["None", "My Corporate Card", "Policy Users Corporate Cards", "All Corporate Card"], 
        default: "None" 
      },
      add: { 
        type: String, 
        enum: ["None", "Myself", "Policy Users", "All Corporate Card"], 
        default: "None" 
      },
    },

    advance: {
      recordFor: { 
        type: String, 
        enum: ["None", "Myself", "Policy Users", "All Users"], 
        default: "None" 
      },
      viewPolicy: { type: Boolean, default: false },
      approveEmployee: { type: Boolean, default: false },
      editAfterExport: { type: Boolean, default: false },
    },

    budget: {
      viewGeneral: { type: Boolean, default: false },
      addModifyGeneral: { type: Boolean, default: false },
      viewUser: { 
        type: String, 
        enum: ["None", "My Budgets", "Policy Users Budgets", "All Budgets"], 
        default: "None" 
      },
      addModifyUser: { 
        type: String, 
        enum: ["None", "My Budgets", "Policy Users Budgets", "All Budgets"], 
        default: "None" 
      },
    },

    delegates: {
      allowSubmit: { type: Boolean, default: false },
      allowApprove: { type: Boolean, default: false },
    },

    settings: {
      addUsers: { type: Boolean, default: false },
      preferences: { type: Boolean, default: false },
      expenseCategories: { type: Boolean, default: false },
      customers: { type: Boolean, default: false },
      projects: { type: Boolean, default: false },
      merchants: { type: Boolean, default: false },
      currencies: { type: Boolean, default: false },
      taxes: { type: Boolean, default: false },
      paymentMode: { type: Boolean, default: false },
      manageIntegrations: { type: Boolean, default: false },
      billing: { type: Boolean, default: false },
    },

    privacy: {
      accessProtectedData: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const RolesSchema = mongoose.model("Role", RoleSchema);

export default RolesSchema;
