/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Education = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * Education section title.
     */
    title: string;
    /**
     * Education section is hidden flag.
     */
    isHidden: boolean;
    /**
     * An array of formal education schools.
     */
    educationList: Array<{
        /**
         * Resource Id.
         */
        id: string;
        /**
         * The name of the title or educational institution.
         */
        title: string;
        /**
         * The name of the career.
         */
        career: string;
        /**
         * The start date of the education (YYYY-MM-DD).
         */
        startDate: string;
        /**
         * The end date of the education (YYYY-MM-DD).
         */
        endDate: string;
        /**
         * A brief description of the education, coursework, or achievements.
         */
        description: string;
        /**
         * Format time config.
         */
        formatTime: string;
        /**
         * Is description field disabled on resume viewwe?.
         */
        descriptionDisabled: boolean;
    }>;
};

