export declare class CreateFileDto {
}
export declare class DeleteFileDto {
    key: string;
}
export declare const MULTIPLE_FILES_API_BODY: {
    schema: {
        type: string;
        properties: {
            files: {
                type: string;
                items: {
                    type: string;
                    format: string;
                };
            };
        };
    };
};
