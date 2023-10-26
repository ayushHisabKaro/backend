export declare const R_sendOtpResponse: {
    data: {
        success: boolean;
        message: string;
    };
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_get_one: {
    data: {
        id: number;
        title: string;
        address: string;
        state: string;
        city: string;
        pinCode: string;
        landmark: string;
        minSalary: number;
        minSalaryInterval: string;
        maxSalary: number;
        maxSalaryInterval: string;
        minIncentive: number;
        minIncentiveInterval: string;
        maxIncentive: number;
        maxIncentiveInterval: string;
        startTime: string;
        endTime: string;
        jobTimingType: string;
        applyBeforeDate: string;
        description: string;
        englishLevel: string;
        phoneNumber: string;
        comment: string;
        emailAddress: string;
        isOpen: boolean;
        createdAt: string;
        organisation: {
            id: number;
            name: string;
            imageUrl: string;
            address: string;
            state: string;
            city: string;
            pinCode: string;
            landmark: string;
            weekelyOff1: number;
            weekelyOff2: number;
            industrySector: string;
            gstNumber: string;
            gstFileUrl: string;
            panNumber: string;
            panFileUrl: string;
            createdAt: string;
        };
        organisationBranch: {
            id: number;
            name: string;
            address: string;
            state: string;
            city: string;
            pinCode: string;
            landmark: string;
            createdAt: string;
        };
        requiredSkills: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        experienceRequired: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        otherLanguages: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        isApplied: boolean;
    };
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_get: {
    data: {
        id: number;
        title: string;
        address: string;
        state: string;
        city: string;
        landmark: string;
        minSalary: number;
        minSalaryInterval: string;
        maxSalary: number;
        maxSalaryInterval: string;
        minIncentive: number;
        minIncentiveInterval: string;
        maxIncentive: number;
        maxIncentiveInterval: string;
        jobTimingType: string;
        applyBeforeDate: string;
        description: string;
        englistLevel: string;
        phoneNumber: string;
        createdAt: string;
        organisation: any;
        organisationBranch: any;
        requiredSkills: any[];
        experienceRequired: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        otherLanguages: {
            id: number;
            name: string;
            createdAt: string;
        }[];
    }[];
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_post: {
    data: {
        title: string;
        address: string;
        state: string;
        city: string;
        landmark: string;
        minSalary: number;
        minSalaryInterval: string;
        maxSalary: number;
        maxSalaryInterval: string;
        minIncentive: number;
        minIncentiveInterval: string;
        maxIncentive: number;
        maxIncentiveInterval: string;
        jobTimingType: string;
        applyBeforeDate: string;
        description: string;
        englistLevel: string;
        phoneNumber: string;
        requiredSkills: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        experienceRequired: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        otherLanguages: {
            id: number;
            name: string;
            createdAt: string;
        }[];
        id: number;
        createdAt: string;
    };
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_patch: {
    data: {
        generatedMaps: any[];
        raw: any[];
        affected: number;
    };
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_delete: {
    data: {
        raw: any[];
        affected: number;
    };
    statusCode: number;
    message: string;
};
export declare const R_hiring_jobs_applied_user: {
    data: {
        id: number;
        createdAt: string;
        job: {
            id: number;
            title: string;
            address: string;
            state: string;
            city: string;
            landmark: string;
            minSalary: number;
            minSalaryInterval: string;
            maxSalary: number;
            maxSalaryInterval: string;
            minIncentive: number;
            minIncentiveInterval: string;
            maxIncentive: number;
            maxIncentiveInterval: string;
            jobTimingType: string;
            applyBeforeDate: string;
            description: string;
            englistLevel: string;
            phoneNumber: string;
            createdAt: string;
            shortlisted: boolean;
        };
    }[];
    statusCode: number;
    message: string;
};
export declare const R_staff_summary: {
    data: {
        analysis: {
            PRESENT: number;
            ABSENT: number;
            LATE_HALF_DAY: number;
            WEEKLY_OFF: number;
            PAID_LEAVE: number;
            weeklyOff: {
                total: number;
                spent: number;
            };
        };
        attendance: {
            id: number;
            photoUrl: any;
            lat: any;
            lng: any;
            address: any;
            createdAt: string;
            updatedAt: string;
            attendanceType: {
                id: number;
                name: string;
                createdAt: string;
            };
        }[];
    };
    statusCode: number;
    message: string;
};
