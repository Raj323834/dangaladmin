
export class ResponsesDescription {

    public static SUCCESS: string = "SUCCESS";
    public static INTERNAL_SERVER_ERROR: string = "Internal Server error";
    public static DB_ERROR: string = "Database Error";
    public static INCORRECT_TIME_INTERVAL: string = "Incorrect time interval";
    public static INVALID_REQUEST: string = "Invalid Request";
    public static USER_NOT_FOUND: string = "User not found";
    public static UNABLE_TO_RETRIEVE_DATA: string = "Unable to retrieve data";
    public static INVALID_PASSWORD: string = "Invalid Password";
    public static NOT_FOUND: string = " not found";
    public static SERVER_ERROR_MSG: string = 'Server error. Please try after sometime';
    public static ERROR_RETRIEVING_DATA: string = 'There was an error retrieving data';
    public static FROM_DATE_TO_DATE_MSG = "From Date should be less than To Date";
    public static INSUFFICIENT_BALANCE = "Insufficient Balance";
    public static PASSWORD_MISMATCH = "Password Mismatch";
    public static USER_DISABLED_MSG = "User is already disabled";
    public static USER_ALREADY_PRESENT = "User already present";

    public static INVALID_FIRST_NAME: string = "Please provide a valid first name";
    public static INVALID_MIDDLE_NAME: string = "Please provide a valid middle name";
    public static INVALID_LAST_NAME: string = "Please provide a valid last name";

    public static QUERY_PARAM_MISSING_MSG = "Error in retrieving data"
    //LEADER BOARD
    public static LEADERBOARD_NOT_FOUND: string = "Leaderboard not found";

    //WITHDRAWAL DETAiLS
    public static NO_WITHDRAWAL_EXIST_MSG: string = "No Withdrawal Exist";
    public static WITHDRAWAL_NOT_DECLINED_MSG: string = "Withdrawal not declined";
    public static ERROR_FINDING_WITHDRAWAL: string = "There was an error finding the withdrawals";
    public static PROCESS_WITHDRAWAL_SUCCESS: string = "Withdrawl successfully updated.";
    public static INVALID_STATUS_MSG: string = "Invalid Status";
    public static WITHDRAWAL_DOES_NOT_EXIST_MSG: string = "Withdrawal does not exist";
    public static PERMISSION_TO_PROCESS_MSG: string = "You don't have the permission to process the withdrawal ";
    public static NOT_A_VALID_WID: string = "Not a valid withdrawal  ID";
    public static ENTER_WITHDRAWAL_ID: string = "Enter a withdrawal  ID";
    public static USER_ID_MISSING_MSG: string = "User Id missing";

    //KYC
    public static DOCUMENT_NOT_FOUND_MSG: string = "No Document uploaded for this user";
    public static SOMETHING_WENT_WRONG: string = "Something went wrong.";
    public static KYC_SERVICE_NOT_REACHABLE_MSG: string = "KYC Service not reachable.";
    public static DOCUMENT_DECLINED_SUCCESSFULLY_MSG: string = "Document declined successfully. This will be listed in current date.";
    public static DOCUMENT_APPROVED_SUCCESSFULLY_MSG: string = "Document approved successfully. This will be listed in current date.";
    public static TABLE_CONFIG_NOT_FOUND: string = "Table Config not found";

    //LOCKED USER
    public static NO_LOCKED_USER_FOUND: string = "No Locked user found";
    public static NO_FRAUD_USER_FOUND: string = "No Fraud user found";



    //UPDATE BALANCE 
    public static WALLET_DOES_NOT_EXIST_MSG: string = "Wallet does not exist.";
    public static WALLET_DISABLED_MSG: string = "Wallet is disabled.";
    public static WALLET_SERVICE_NOT_REACHABLE_MSG: string = "Wallet Service is  not reachable.";
    public static INVALID_WALLET_NAME_MSG: string = "Invalid Wallet Name.";


    //USER DETAILS
    public static ERROR_FINDING_USERID: string = "There was error finding the user id";
    public static ERROR_FINDING_DETAILS: string = "There was an error finding user details";
    public static ERROR_FINDING_REPORT: string = "There was an error finding report";


    //REPORTS
    public static REPORT_UPLOAD_FAILED: string = "Report upload failed";
    public static QUERY_PARAMS_MISSING_TRANS_REP: string = "Please provide either User ID or Game Id";
    public static INVALID_USER_ID: string = "Invalid User ID";
    public static INVALID_USERNAME: string = "Invalid Username";
    public static INVALID_DATE_RANGE: string = "Invalid Date Range";
    public static NO_DATA_AVAILABLE_FOR_FILTER: string = "No data available with the above filters";
    public static ENTER_BOTH_FROM_TO_DATE: string = "Enter Both From Date and To Date";
    public static ENTER_ALL_FIELDS: string = "Enter all the fields";
    public static NO_DATA_FOR_THIS_USER: string = "No data for this user";

    //BONUS
    public static SUCCESS_BONUS_MSG: string = "Bonus created successfully";
    public static SUCCESS_UPDATEBONUS_MSG: string = "Bonus updated successfully";
    public static FAILED_BONUS_MSG: string = "Bonus creation failed";
    public static SIGNUP_BONUS_INFO_MISSING_MSG: string = "Sign up Information is missing";
    public static BONUS_SERVICE_NOT_REACHABLE_MSG: string = "Bonus Service is not reachable";
    public static DEPOSIT_BONUS_INFO_MISSING_MSG: string = "Deposit Bonus Info is missing";
    public static BONUS_ALREADY_EXIST_MSG: string = "Bonus already exist";
    public static INVALID_BONUS_NAME_MSG: string = "Invalid Bonus Name";
    public static INVALID_BONUS_INFO_MSG: string = "Invalid Bonus Info";
    public static BONUS_DOES_NOT_EXIST_MSG: string = " Bonus does not exist";
    public static NO_BONUS_EXIST_MSG: string = "No Bonus exist";


    //ADMIN

    public static USER_ALREADY_EXIST_MSG: string = "User Already Exists";
    public static INVALID_PASSWORD_MSG: string = "Invalid Password";
    public static INVALID_EMAIL_MSG: string = "Invalid Email";
    public static INVALID_ROLE_MSG: string = "Invalid Role";
    public static INVALID_MOBILE_MSG: string = "Invalid Mobile";
    public static DUPLICATE_USERNAME_MSG: string = "Username Already Exists . Try Different Username";

    //BY-PASS

    public static VALID_INPUT_MSG: string = "Please provide a valid input";

    public INVALID_DATE_RANGE = "Enter Active Form Date less than Active Till date"

    //Call break 

    public INVALID_gameId = " please provide a valid game Id"
    public BAD_REQUEST = "bad request, check all missing data"
    //banner
    public BANNER_NOT_FOUND = "Banner Not Found to Upload"
   
    public INVALID_GAME = "Invalid Game Id"



}
