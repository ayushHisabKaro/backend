export const R_sendOtpResponse = {
  data: {
    success: true,
    message: 'Otp sent!',
  },
  statusCode: 200,
  message: 'Success',
};
export const R_hiring_jobs_get_one = {
  data: {
    id: 582,
    title: 'Mid-level UX Designer',
    address: 'Test address city, state 543210',
    state: 'gujarat',
    city: 'surat',
    pinCode: '123456',
    landmark: 'bhimrad canal',
    minSalary: 10000,
    minSalaryInterval: 'month',
    maxSalary: 30000,
    maxSalaryInterval: 'month',
    minIncentive: 1000,
    minIncentiveInterval: 'month',
    maxIncentive: 3000,
    maxIncentiveInterval: 'month',
    startTime: '00:00:00',
    endTime: '00:00:00',
    jobTimingType: 'Full Time',
    applyBeforeDate: '2022-10-01',
    description:
      "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
    englishLevel: 'Halka Engllish',
    phoneNumber: '9090909090',
    comment: 'some discription',
    emailAddress: 'jobEmail@gmail.com',
    isOpen: false,
    createdAt: '2022-10-09T08:01:37.526Z',
    organisation: {
      id: 11,
      name: 'Zognest',
      imageUrl:
        'https://hk-dev-storage.s3.ap-south-1.amazonaws.com/DOCUMENTS/1665241683709.png',
      address: 'VIP road',
      state: 'Gujarat',
      city: 'Surat',
      pinCode: '',
      landmark: 'Adajan',
      weekelyOff1: 0,
      weekelyOff2: 0,
      industrySector: 'Construction',
      gstNumber: '123123123',
      gstFileUrl:
        'https://hk-dev-storage.s3.ap-south-1.amazonaws.com/DOCUMENTS/1665241683030.png',
      panNumber: '456456',
      panFileUrl:
        'https://hk-dev-storage.s3.ap-south-1.amazonaws.com/DOCUMENTS/1665241683231.jpg',
      createdAt: '2022-10-08T09:38:04.246Z',
    },
    organisationBranch: {
      id: 11,
      name: 'Main Branch',
      address: 'Test address city, state 543210',
      state: 'gujarat',
      city: 'surat',
      pinCode: '',
      landmark: 'bhimrad canal',
      createdAt: '2022-10-08T08:02:34.076Z',
    },
    requiredSkills: [
      {
        id: 27,
        name: 'Photoshop',
        createdAt: '2022-10-09T08:01:31.149Z',
      },
      {
        id: 28,
        name: 'Illustrator',
        createdAt: '2022-10-09T08:01:31.220Z',
      },
    ],
    experienceRequired: [
      {
        id: 664,
        name: 'Experienced',
        createdAt: '2022-10-09T08:01:30.706Z',
      },
    ],
    otherLanguages: [
      {
        id: 2613,
        name: 'Hindi',
        createdAt: '2022-10-09T08:01:30.848Z',
      },
      {
        id: 2614,
        name: 'Gujarati',
        createdAt: '2022-10-09T08:01:30.920Z',
      },
    ],
    isApplied: false,
  },
  statusCode: 200,
  message: 'Success',
};

export const R_hiring_jobs_get = {
  data: [
    {
      id: 2,
      title: 'Mid-level UX Designer',
      address: 'Test address city, state 543210',
      state: 'gujarat',
      city: 'surat',
      landmark: 'bhimrad canal',
      minSalary: 10000,
      minSalaryInterval: 'month',
      maxSalary: 30000,
      maxSalaryInterval: 'month',
      minIncentive: 1000,
      minIncentiveInterval: 'month',
      maxIncentive: 3000,
      maxIncentiveInterval: 'month',
      jobTimingType: 'Full Time',
      applyBeforeDate: '2022-10-01',
      description:
        "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
      englistLevel: 'Halka Engllish',
      phoneNumber: '9090909090',
      createdAt: '2022-10-01T09:30:02.958Z',
      organisation: null,
      organisationBranch: null,
      requiredSkills: [],
      experienceRequired: [
        {
          id: 4,
          name: 'Experienced',
          createdAt: '2022-10-01T09:30:02.472Z',
        },
      ],
      otherLanguages: [
        {
          id: 13,
          name: 'Hindi',
          createdAt: '2022-10-01T09:30:02.596Z',
        },
        {
          id: 14,
          name: 'Gujarati',
          createdAt: '2022-10-01T09:30:02.669Z',
        },
      ],
    },
  ],
  statusCode: 200,
  message: 'Success',
};

export const R_hiring_jobs_post = {
  data: {
    title: 'Mid-level UX Designer',
    address: 'Test address city, state 543210',
    state: 'gujarat',
    city: 'surat',
    landmark: 'bhimrad canal',
    minSalary: 10000,
    minSalaryInterval: 'month',
    maxSalary: 30000,
    maxSalaryInterval: 'month',
    minIncentive: 1000,
    minIncentiveInterval: 'month',
    maxIncentive: 3000,
    maxIncentiveInterval: 'month',
    jobTimingType: 'Full Time',
    applyBeforeDate: '2022-10-01',
    description:
      "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
    englistLevel: 'Halka Engllish',
    phoneNumber: '9090909090',
    requiredSkills: [
      {
        id: 15,
        name: 'Photoshop',
        createdAt: '2022-10-01T09:30:02.784Z',
      },
      {
        id: 16,
        name: 'Illustrator',
        createdAt: '2022-10-01T09:30:02.848Z',
      },
    ],
    experienceRequired: [
      {
        id: 4,
        name: 'Experienced',
        createdAt: '2022-10-01T09:30:02.472Z',
      },
    ],
    otherLanguages: [
      {
        id: 13,
        name: 'Hindi',
        createdAt: '2022-10-01T09:30:02.596Z',
      },
      {
        id: 14,
        name: 'Gujarati',
        createdAt: '2022-10-01T09:30:02.669Z',
      },
    ],
    id: 2,
    createdAt: '2022-10-01T09:30:02.958Z',
  },
  statusCode: 200,
  message: 'Success',
};

export const R_hiring_jobs_patch = {
  data: {
    generatedMaps: [],
    raw: [],
    affected: 1,
  },
  statusCode: 200,
  message: 'Success',
};

export const R_hiring_jobs_delete = {
  data: {
    raw: [],
    affected: 1,
  },
  statusCode: 200,
  message: 'Success',
};

export const R_hiring_jobs_applied_user = {
  data: [
    {
      id: 1,
      createdAt: '2022-10-02T12:41:44.272Z',
      job: {
        id: 115,
        title: 'Mid-level UX Designer',
        address: 'Test address city, state 543210',
        state: 'gujarat',
        city: 'surat',
        landmark: 'bhimrad canal',
        minSalary: 10000,
        minSalaryInterval: 'month',
        maxSalary: 30000,
        maxSalaryInterval: 'month',
        minIncentive: 1000,
        minIncentiveInterval: 'month',
        maxIncentive: 3000,
        maxIncentiveInterval: 'month',
        jobTimingType: 'Full Time',
        applyBeforeDate: '2022-10-01',
        description:
          "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
        englistLevel: 'Halka Engllish',
        phoneNumber: '9090909090',
        createdAt: '2022-10-02T12:11:50.493Z',
        shortlisted: true,
      },
    },
  ],
  statusCode: 200,
  message: 'Success',
};

export const R_staff_summary = {
  data: {
    analysis: {
      PRESENT: 0,
      ABSENT: 1,
      LATE_HALF_DAY: 0,
      WEEKLY_OFF: 0,
      PAID_LEAVE: 0,
      weeklyOff: {
        total: 0,
        spent: 0,
      },
    },
    attendance: [
      {
        id: 1,
        photoUrl: null,
        lat: null,
        lng: null,
        address: null,
        createdAt: '2022-11-23T12:00:00.078Z',
        updatedAt: '2022-11-23T12:00:00.078Z',
        attendanceType: {
          id: 2,
          name: 'ABSENT',
          createdAt: '2022-11-23T10:54:23.641Z',
        },
      },
    ],
  },
  statusCode: 200,
  message: 'Success',
};
