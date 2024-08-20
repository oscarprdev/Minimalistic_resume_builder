/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Languages = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * Languages section title.
     */
    title: string;
    /**
     * Languages section is hidden flag.
     */
    isHidden: boolean;
    /**
     * An array of languages.
     */
    languageList: Array<{
        /**
         * Resource Id.
         */
        id: string;
        /**
         * The language name.
         */
        name: string;
        /**
         * The language level.
         */
        level: string;
        /**
         * The language certificate url.
         */
        certificateLink?: string;
    }>;
};

