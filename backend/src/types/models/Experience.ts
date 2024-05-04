/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Experience = {
    /**
     * Experience section title.
     */
    title: string;
    /**
     * An array of jobs.
     */
    jobList: Array<{
        /**
         * The job title.
         */
        title: string;
        /**
         * The name of the company.
         */
        company: string;
        /**
         * The start date of the job (YYYY-MM-DD).
         */
        startDate: string;
        /**
         * The end date of the job (YYYY-MM-DD).
         */
        endDate: string;
        /**
         * A brief description of the job responsibilities and achievements.
         */
        description: string;
    }>;
};

