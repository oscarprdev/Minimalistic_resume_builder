/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Resume = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * The title of the resume.
     */
    title: string;
    /**
     * The theme of the resume.
     */
    theme: Resume.theme;
    /**
     * Header flag to know if header already created.
     */
    header: boolean;
    /**
     * Summary flag to know if summary already created.
     */
    summary: boolean;
    /**
     * Experience flag to know if experience already created.
     */
    experience: boolean;
    /**
     * Education flag to know if education already created.
     */
    education: boolean;
    /**
     * Languages flag to know if languages already created.
     */
    languages: boolean;
    /**
     * Skills flag to know if skills already created.
     */
    skills: boolean;
    /**
     * The resume image url.
     */
    image: string;
};
export namespace Resume {
    /**
     * The theme of the resume.
     */
    export enum theme {
        DEFAULT = 'default',
        VERTICAL = 'vertical',
    }
}

