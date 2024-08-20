/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Skills = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * Skills section title.
     */
    title: string;
    /**
     * Skills section is hidden flag.
     */
    isHidden: boolean;
    /**
     * An array of skills.
     */
    skillList: Array<{
        /**
         * Resource Id.
         */
        id: string;
        /**
         * The skill name.
         */
        name: string;
    }>;
};

