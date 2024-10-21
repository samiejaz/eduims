export const ROUTE_URLS = {
  BUSINESS_TYPE: "/general/businesstype",
  DEPARTMENT: "/general/department",
  COUNTRY_ROUTE: "/general/country",
  TEHSIL_ROUTE: "/general/tehsil",
  BUSINESS_NATURE_ROUTE: "/general/businessnature",
  BUSINESS_SEGMENT_ROUTE: "/general/businesssegment",
  LEED_SOURCE_ROUTE: "/general/leadsource",
  LEAD_INTRODUCTION_ROUTE: "/general/leadintroduction",
  USER_ROUTE: "/general/users",

  CUSTOMERS: {
    CUSTOMER_ENTRY: "/customer/customerentry",
    OLD_CUSTOMER_ENTRY: "/customer/oldcustomerentry",
    CUSTOMER_INVOICE: "/customer/customerinvoice",
    RECIEPT_VOUCHER_ROUTE: "/customer/reciepts",
    SUPPLIER_INFO_ROUTE: "/supplier/suplierinfo",
  },
  GENERAL: {
    BUSINESS_UNITS: "/general/businessunits",
    SESSION_INFO: "/general/sessioninfo",
    PRODUCT_CATEGORY_ROUTE: "/general/productcategory",
    PRODUCT_INFO_ROUTE: "/general/productinfo",
    COMPANY_INFO_ROUTE: "/general/companyinfo",
    LEADS_INTROUDCTION_VIEWER_ROUTE: "/general/leadintroduction/leadsview",
    LEADS_INTROUDCTION_DETAIL_VIEWER_ROUTE:
      "/general/leadintroduction/leadsview/detail",
    LEADS_INTROUDCTION_COMMENT_ROUTE: "/general/leadintroduction/leadcomments",
    APP_CONFIGURATION_ROUTE: "/utilities/appconfiguration",
  },
  UTILITIES: {
    PRODUCT_CATEGORY_ROUTE: "/utilities/productcategory",
    PRODUCT_INFO_ROUTE: "/utilities/productinfo",
    INVOICE_DESCRIPTIONS: "/utilities/invoicedescription",
  },
  ACCOUNTS: {
    BANK_ACCOUNT_OPENING: "/accounts/bankaccountopening",
    CUSTOMER_INVOICE: "/customer/customerinvoice",
    RECIEPT_VOUCHER_ROUTE: "/customer/reciepts",
    DEBIT_NODE_ROUTE: "/customer/debitnote",
    CREDIT_NODE_ROUTE: "/customer/creditnote",
    NEW_CUSTOMER_INVOICE: "/customer/newcustomerinvoice",
  },
  LEADS: {
    LEADS_DASHBOARD: "/leads/dashboard",
    LEED_SOURCE_ROUTE: "/leads/leadsource",
    LEAD_INTRODUCTION_ROUTE: "/leads/leadintroduction",
    LEADS_USER_DASHBOARD: "/leads/userdashboard",
  },
  CONFIGURATION: {
    USER_RIGHTS_ROUTE: "/configuration/userrights",
  },
  REPORTS: {
    ACCOUNT_LEDGER_REPORT_ROUTE: "/reports/accountledger",
    BUSINESS_UNIT_AND_BALANCE_LEDGER_REPORT_ROUTE:
      "/reports/businessunitandbalancewiseledger",
    SUBSIDIARY_SHEET_REPORT_ROUTE: "/reports/subsidiarysheet",
    SUBSIDIARY_SHEET_SUMMARY_REPORT_ROUTE: "/reports/subsidiarysheetsummary",
    CUSTOMER_AGING_REPORT_ROUTE: "/reports/customeragingreport",
    LEADS_INFORMATION_REPORT_ROUTE: "/reports/leadinformationreport",
  },
  ADMIN: {
    SYNC_ROUTES: "/admin/syncroutes",
  },
  PUBLIC: {
    CUSTOMER_INVOICE_ROUTE: "/pub/customerinvoice",
    RECEIPT_VOUCHER_ROUTE: "/pub/receiptvoucher",
    ACCOUNT_LEDGER_ROUTE: "/pub/accountledger",
  },
  DASHBOARD: {
    MAIN: "/dashboard",
    PENDING_INVOICES_ROUTE: "/dashboard/pendinginvoices",
    PENDING_RECEIPTS_ROUTE: "/dashboard/pendingreceipts",
    SUPPLIER_ANALYSIS_DETAIL_ROUTE: "/dashboard/supplieranalysis",
  },
  EDU_SOFTWARE_MANAGEMENT: {
    MAIN: "/taskmanagement",
    DISCUSSION_PENDING_TASKS: "/dicussionpending",
  },
  TASKSANDPROJECTS: {
    MAIN: "/tasksandprojects",
  },
}

export const QUERY_KEYS = {
  BUSINESS_TYPE_QUERY_KEY: "businessTypes",
  BUSINESS_UNIT_QUERY_KEY: "businessUnits",
  DEPARTMENT_QUERY_KEY: "departments",
  COUNTRIES_QUERY_KEY: "countries",
  TEHSIL_QUERY_KEY: "tehsils",
  BUSINESS_NATURE_QUERY_KEY: "businessNature",
  BUSINESS_SEGMENT_QUERY_KEY: "businessSegments",
  LEED_SOURCE_QUERY_KEY: "leadSources",
  LEAD_INTRODUCTION_QUERY_KEY: "leadIntroduction",
  LEADS_CARD_DATA: "leadsCardData",
  LEADS_DEMO_DATA: "leadsDemoData",
  SESSION_INFO_QUERY_KEY: "sessions",
  RECEIPT_VOUCHER_INFO_QUERY_KEY: "receiptVouchers",
  DEBIT_NODE_QUERY_KEY: "debitNotes",
  CREDIT_NODE_QUERY_KEY: "creditNotes",
  CUSTOMER_INVOICE_QUERY_KEY: "customerInvoices",
  BANK_ACCOUNTS_QUERY_KEY: "bankAccountOpenings",
  OLD_CUSTOMERS_QUERY_KEY: "oldcustomers",
  PRODUCT_CATEGORIES_QUERY_KEY: "productCategories",
  PRODUCT_INFO_QUERY_KEY: "productsInfo",
  USER_ROLES_QUERY_KEY: "userRoles",
  SUPPLIER_INFO_QUERY_KEY: "suppliers",
  // Select
  ALL_CUSTOMER_QUERY_KEY: "oldcustomers",
  CUSTOMER_ACCOUNTS_QUERY_KEY: "customerAccounts",
}

export const SELECT_QUERY_KEYS = {
  COUNTRIES_SELECT_QUERY_KEY: "countriesSelect",
  BUSINESS_TYPES_SELECT_QUERY_KEY: "businessTypesSelect",
  BUSINESS_NATURE_SELECT_QUERY_KEY: "businessNatureSelect",
  BUSINESS_SEGMENTS_SELECT_QUERY_KEY: "businessSegmentSelect",
  TEHSIL_SELECT_QUERY_KEY: "tehsilsSelect",
  LEAD_SOURCE_SELECT_QUERY_KEY: "leadSourcesSelect",
  DEPARTMENT_SELECT_QUERY_KEY: "departmentsSelect",
  USERS_SELECT_QUERY_KEY: "usersSelect",
  SESSION_SELECT_QUERY_KEY: "sessionsSelect",
  BANKS_SELECT_QUERY_KEY: "bankAccountsSelect",
  CUSTOMER_BRANCHES_SELECT_QUERY_KEY: "customerBranchesSelect",
  PRODUCTS_INFO_SELECT_QUERY_KEY: "productsInfoSelect",
  SERVICES_SELECT_QUERY_KEY: "servicesInfoSelect",
  BUSINESS_UNIT_SELECT_QUERY_KEY: "businessUnitsSelect",
  ACTIVATION_CLIENTS_SELECT_QUERY_KEY: "activationClientsSelect",
  SOFTWARE_CLIENTS_SELECT_QUERY_KEY: "softwareClientsSelect",
  PRODUCT_CATEGORIES_SELECT_QUERY_KEY: "productCategoriesSelect",
  USER_ROLES_SELECT_QUERY_KEY: "userRolesSelect",
}

export const REPORTS_QUERY_KEYS = {
  ACCOUNT_LEDGER_QUERY_KEY: "accountLedgerReport",
  SUBSIDIARY_SHEET_QUERY_KEY: "subsidiarySheetReport",
}

export const TOAST_CONTAINER_IDS = {
  CLOSE_ON_CLICK: "closeOnClick",
  AUTO_CLOSE: "autoClose",
}

export const MENU_KEYS = {
  GENERAL: {
    GROUP_NAME: "General",
    GROUP_KEY: "mnuGeneral",
    COUNTRY_FORM_KEY: "mnuCountry",
    TEHSIL_FORM_KEY: "mnuTehsil",
    COMPANY_INFO_FORM_KEY: "mnuCompanyInfo",
    BUSINESS_UNIT_FORM_KEY: "mnuBusinessUnit",
    BUSINESS_NATURE_FORM_KEY: "mnuBusinessNature",
    BUSINESS_TYPE_FORM_KEY: "mnuBusinessType",
    BUSINESS_SEGMENT_FORM_KEY: "mnuBusinessSegment",
    SESSION_INFO_FORM_KEY: "mnuSessionInfo",
  },
  USERS: {
    GROUP_NAME: "Users",
    GROUP_KEY: "mnuUsers",
    USERS_FORM_KEY: "mnuUsers",
    DEPARTMENTS_FORM_KEY: "mnuDepartments",
    CUSTOMERS_FORM_KEY: "mnuCustomers",
    OLD_CUSTOMERS_FORM_KEY: "mnuOldCustomers",
  },
  ACCOUNTS: {
    GROUP_NAME: "Accounts",
    GROUP_KEY: "mnuAccounts",
    BANK_ACCOUNTS_FORM_KEY: "mnuBankAccounts",
    RECIEPT_VOUCHER_FORM_KEY: "mnuRecieptVoucher",
    DEBIT_NOTE_FORM_KEY: "mnuDebitNote",
    CREDIT_NOTE_FORM_KEY: "mnuCreditNote",
    CUSTOMER_INVOICE_FORM_KEY: "mnuNewCustomerInvoice",
  },
  LEADS: {
    GROUP_NAME: "Leads",
    GROUP_KEY: "mnuLeads",
    LEADS_FORM_KEY: "mnuLeads",
    LEAD_SOURCE_FORM_KEY: "mnuLeadSource",
    LEAD_INTRODUCTION_FORM_KEY: "mnuLeadIntroduction",
    LEADS_DASHBOARD_KEY: "mnuLeadsDashboard",
    LEADS_USER_DASHBOARD_KEY: "mnuLeadsUserDashboard",
  },
  UTILITIES: {
    GROUP_NAME: "Utilities",
    GROUP_KEY: "mnuUtitities",
    APP_CONFIGURATION_FORM_KEY: "mnuAppConfiguration",
    PRODUCT_CATEGORIES_FORM_KEY: "mnuProductCategories",
    PRODUCT_INFO_FORM_KEY: "mnuProductInfo",
    INVOICE_DESCRIPTIONS_FORM_KEY: "mnuInvoiceDescriptions",
  },
  CONFIGURATION: {
    GROUP_NAME: "Configuration",
    GROUP_KEY: "mnuConfiguration",
    USER_RIGHTS_ROUTE: "mnuUserRights",
  },
  REPORTS: {
    GROUP_NAME: "Reports",
    GROUP_KEY: "mnuReports",
    ACCOUNT_LEDGER_REPORT_FORM_KEY: "mnuAccountLedgerReport",
    BUSINESS_UNIT_AND_BALANCE_LEDGER_REPORT_FORM_KEY:
      "mnuBusinessUnitAndBalanceReport",
    SUBSIDIARY_REPORT_FORM_KEY: "mnuSubsidarySheetReport",
    SUBSIDIARY_SHEET_SUMMARY_REPORT_ROUTE: "mnuSubsidarySheetReportSummary",
    CUSTOMER_AGING_FORM_KEY: "mnuCustomerAgingReport",
    LEADS_INFORMATION_FORM_KEY: "mnuLeadsInformationReport",
  },
  CUSTOMERS: {
    GROUP_NAME: "Customers",
    GROUP_KEY: "mnuCustomers",
    CUSTOMERS_FORM_KEY: "mnuCustomers",
    OLD_CUSTOMERS_FORM_KEY: "mnuOldCustomers",
    SUPPLIER_FORM_KEY: "mnuSuppliers",
  },
  EDU_SOFTWARE_MANAGEMENT: {
    GROUP_NAME: "Edu Software Management",
    GROUP_KEY: "mnuEduSoftwareManagement",
    TASK_MANAGEMENT_FORM_KEY: "mnuTaskManagement",
    PENDING_TASK_FORM_KEY: "mnuPendingTasks",
  },
  TASKS_AND_PROJECTS: {
    GROUP_NAME: "Tasks and Projects",
    GROUP_KEY: "mnuTasksandProjects",
  },
}

export const MOVEABLE_COMPNENTS_NAMES = {
  LEADS_DASHBOARD_CARDS: "InfoCardsContainer",
}

export const LOCAL_STORAGE_KEYS = {
  USER_KEY: "sQbnIru",
}

export const TABLE_NAMES = {
  COUNTRY: "gen_Country",
  TEHSIL: "gen_Tehsil",
  COMPANY_INFO: "gen_CompanyInfo",
  BUSINESS_UNIT: "gen_BusinessUnits",
  BUSINESS_NATURE: "gen_BusinessNature",
  BUSINESS_TYPE: "gen_BusinessType",
  BUSINESS_SEGMENT: "gen_BusinessSegment",
  SESSION_INFO: "gen_SessionInfo",
  PRODUCT_CATEGORY: "gen_ProductCategory",
  PRODUCTS_INFO: "gen_ProductsInfo",
  CUSTOMER_INFO_1: "gen_CustomerInfo",
  OLD_CUSTOMER_INFO: "gen_CustomerInfo",
  USERS: "gen_Users",
  DEPARTMENTS: "gen_Departments",
  BANK_ACCOUNT_OPENING: "gen_BankAccountOpening",
  CUSTOMER_INVOICE: "data_CustomerInvoice",
  RECEIPT_VOUCHER: "data_ReceiptVoucher",
  CREDIT_NOTE: "data_CreditNote",
  DEBIT_NOTE: "data_DebitNote",
  APP_CONFIGURATION: "gen_AppConfiguration",
  USER_ROLE: "gen_UserRole",
  LEAD_SOURCE: "gen_LeadSource",
  LEAD_INTRODUCTION: "gen_LeadIntroduction",
}

const NAVIGATED_FROM_ARR = [
  {
    title: "Pending Invoices",
    routeUrl: ROUTE_URLS.DASHBOARD.PENDING_INVOICES_ROUTE,
    key: "pending_invoices",
  },
  {
    title: "Pending Receipts",
    routeUrl: -1,
    key: "pending_receipts",
  },
  {
    title: "Supplier Analysis",
    routeUrl: ROUTE_URLS.DASHBOARD.SUPPLIER_ANALYSIS_DETAIL_ROUTE,
    key: "supplier_analysis",
  },
]

export function getNavigatedFrom(key) {
  return NAVIGATED_FROM_ARR.find((item) => item.key === key)
}
