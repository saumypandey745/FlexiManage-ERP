export declare class EncryptionService {
    private readonly algorithm;
    private readonly key;
    constructor();
    encrypt(text: string): {
        encryptedValue: string;
        iv: string;
    };
    decrypt(encryptedValue: string, ivHex: string): string;
}
