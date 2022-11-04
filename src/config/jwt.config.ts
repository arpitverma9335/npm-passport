import { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken';

export const jwtSignOptions: SignOptions = {
    expiresIn: "2h",
}

export const jwtVerifyOptions: VerifyOptions = { };

export const jwtDecodeOptions: DecodeOptions = {
    // json: true,
};


