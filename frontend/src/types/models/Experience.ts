/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Experience = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * Experience section title.
     */
    title: string;
    /**
     * Experience section is hidden flag.
     */
    isHidden: boolean;
    /**
     * An array of jobs.
     */
    jobList: Array<{
        /**
         * Resource Id.
         */
        id: string;
        /**
         * The job title.
         */
        title: string;
        /**
         * The name of the company.
         */
        company: string;
        /**
         * Duration dates of current job.
         */
        dates: string;
        /**
         * A brief description of the job responsibilities and achievements.
         */
        description: string;
    }>;
};

