/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Header = {
    /**
     * Resource Id.
     */
    id: string;
    /**
     * The name of the person associated with the resume.
     */
    name: string;
    /**
     * The job title or professional designation of the person.
     */
    job: string;
    /**
     * The geographic location of the person, typically their city and state/province.
     */
    location: string;
    /**
     * The email address of the person.
     */
    email: string;
    /**
     * The phone number of the person.
     */
    phone: string;
    /**
     * An array of links associated with the person's online profiles or portfolios.
     */
    links: Array<string>;
    /**
     * The image url of the person associated with the resume.
     */
    image?: string;
    /**
     * Header section is hidden flag.
     */
    isHidden: boolean;
};

