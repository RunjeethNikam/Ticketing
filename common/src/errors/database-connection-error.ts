import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = "Error connecting a database";
	constructor() {
		super("Error connecting a database");

		// Only because we are extending a buildin class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
	serializeErrors() {
		return [{ message: this.reason }];
	}
}
