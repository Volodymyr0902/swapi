import {FileValidator} from "@nestjs/common";

export class ImageTypeValidator extends FileValidator {
    constructor(private readonly options: { regex: RegExp }) {
        super(options);
    }

    isValid(file?: Express.Multer.File): boolean {
        return !!file && this.options.regex.test(file.mimetype);
    }

    buildErrorMessage(): string {
        return `Only image files are allowed.`;
    }
}