/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from './Job';
import type { Language } from './Language';
import type { School } from './School';
import type { Skill } from './Skill';
export type ResumeCompleted = {
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
    theme: ResumeCompleted.theme;
    header: (null | {
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
    });
    summary: (null | {
        /**
         * Resource Id.
         */
        id: string;
        /**
         * Summary section title.
         */
        title: string;
        /**
         * Summary section is hidden flag.
         */
        isHidden: boolean;
        /**
         * A brief summary of the owner's professional background and skills.
         */
        summary: string;
    });
    experience: (null | {
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
        jobList: Array<Job>;
    });
    education: (null | {
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
        educationList: Array<School>;
    });
    languages: (null | {
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
        languageList: Array<Language>;
    });
    skills: (null | {
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
        skillList: Array<Skill>;
    });
    /**
     * The resume image url.
     */
    image: string;
};
export namespace ResumeCompleted {
    /**
     * The theme of the resume.
     */
    export enum theme {
        DEFAULT = 'default',
        VERTICAL = 'vertical',
    }
}

