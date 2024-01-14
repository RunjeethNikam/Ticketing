import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
	statusCode = 404;
	constructor() {
		super("The requested webpage not Found");

		// Only because we are extending a buildin class
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
	serializeErrors() {
		return [{ message: "Not Found" }];
	}
}
