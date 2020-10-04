/**
 * A list of collections to create initially
 */
const COLLECTIONS = [
  {
    name: 'settings',
    documents: [
      {
        id: 'user',
        roles: [
          /**
           * List all users that should be created initially.
           * Initially created users can only login through
           * third party provides (google, facebook...).
           * If you want to create a user with email/password
           * add an account for him in Authentication in the
           * firebase dashboard.
           */
          {
            email: 'sven.djanis@gmail.com',
            role: 'admin'
          }
        ]
      },
      {
        id: 'layout',
        navigation: {
          items: [
            {
              icon: 'dashboard',
              label: 'LAYOUT.DASHBOARD',
              type: 'link',
              value: '/dashboard'
            },
            {
              icon: 'business',
              label: 'Associate Members',
              type: 'link',
              value: '/m/associate-members/overview'
            },
            {
              icon: 'contacts',
              label: 'Contact',
              type: 'link',
              value: '/m/contact/overview'
            },
            {
              icon: 'school',
              label: 'Education',
              type: 'link',
              value: '/m/education/overview'
            },
            {
              icon: 'supervisor_account',
              label: 'Full Members',
              type: 'link',
              value: '/m/full-members/overview'
            },
            {
              icon: 'analytics',
              label: 'Glyco Databases',
              type: 'link',
              value: '/m/glyco-databases/overview'
            },
            {
              icon: 'article',
              label: 'News',
              type: 'link',
              value: '/m/news/overview'
            },
            {
              icon: 'business_center',
              label: 'Projects',
              type: 'link',
              value: '/m/projects/overview'
            },
            {
              icon: 'wysiwyg',
              label: 'Resources',
              type: 'link',
              value: '/m/resources/overview'
            },
            {
              children: [
                {
                  icon: 'supervised_user_circle',
                  label: 'GENERAL.USERS',
                  type: 'link',
                  value: '/m/users/overview'
                },
                {
                  icon: 'vpn_key',
                  label: 'GENERAL.ROLES',
                  type: 'link',
                  value: '/m/roles/overview'
                }
              ],
              icon: 'account_box',
              label: 'LAYOUT.MANAGEMENT',
              type: 'expandable'
            },
            {
              children: [
                {
                  icon: 'view_module',
                  label: 'LAYOUT.MODULES',
                  type: 'link',
                  value: '/module-definition/overview'
                },
                {
                  icon: 'settings',
                  label: 'LAYOUT.SETTINGS',
                  type: 'link',
                  value: '/settings'
                }
              ],
              icon: 'dns',
              label: 'LAYOUT.SYSTEM',
              type: 'expandable'
            }
          ]
        }
      }
    ]
  },
  {
    name: 'roles',
    documents: [
      {
        id: 'admin',
        name: 'Admin',
        description: 'A user with access to all collections',
        createdOn: Date.now()
      },
      {
        id: 'user',
        name: 'User',
        description: 'A user with limited application access',
        createdOn: Date.now()
      }
    ]
  }
];

const MODULES = [
  {
    id: 'users',
    name: 'Users',
    description: 'App Users',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {
        persist: true,
        schema: {
          properties: {
            role: {
              type: 'string'
            }
          }
        },
        definitions: {
          role: {
            label: 'Role',
            component: {
              type: 'select',
              configuration: {
                populate: {
                  collection: 'roles'
                }
              }
            }
          }
        },
        segments: [
          {
            type: 'empty',
            fields: ['/role']
          }
        ]
      },
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/createdOn', '/id', '/name', '/email', '/role']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/createdOn',
            label: 'Created On',
            pipe: ['date'],
            sortable: true
          },
          {
            key: '/name',
            label: 'Name'
          },
          {
            key: '/email',
            label: 'Email'
          },
          {
            key: '/role',
            label: 'Role',
            control: true
          }
        ],
        actions: [
          {
            value: `it => '<jms-e-tpr data-email="' + it.data.email + '"></jms-e-tpr>'`
          },
          {
            value: `it => '<jms-e-cp data-id="' + it.id + '"></jms-e-cp>'`
          },
          {
            value: `it => '<jms-e-tus data-id="' + it.id + '"></jms-e-tus>'`
          }
        ]
      },
      overview: {
        toolbar: ['<jms-e-user-add></jms-e-user-add>']
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        email: {
          type: 'number'
        },
        createdOn: {
          type: 'number'
        },
        role: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name'
      },
      email: {
        label: 'Email',
        component: {
          type: 'input',
          configuration: {
            type: 'email'
          }
        }
      },
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        }
      },
      role: {
        label: 'Role',
        component: {
          type: 'select',
          configuration: {
            populate: {
              collection: 'roles',
              orderBy: 'name'
            }
          }
        }
      }
    }
  },
  {
    id: 'roles',
    name: 'Roles',
    description: 'Collection of roles that can be assigned to users',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 1,
      editTitleKey: 'name',
      icon: 'vpn_key',
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/createdOn', '/name', '/description']
          }
        ]
      },
      table: {
        tableColumns: [
          {
            key: '/createdOn',
            label: 'Created On',
            pipe: ['date'],
            sortable: true
          },
          {
            key: '/name',
            label: 'Name'
          },
          {
            key: '/description',
            label: 'Description'
          }
        ]
      }
    },
    schema: {
      properties: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        createdOn: {
          type: 'number'
        }
      }
    },
    definitions: {
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        },
        columnsDesktop: 4,
        columnsMobile: 12
      },
      name: {
        label: 'Name',
        columnsDesktop: 4,
        columnsMobile: 12
      },
      description: {
        label: 'Description',
        component: {
          type: 'textarea'
        },
        columnsDesktop: 4,
        columnsMobile: 12
      }
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Contact',
    authorization: {
      read: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/name', '/email']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/name',
            label: 'Name',
            sortable: true
          },
          {
            key: '/email',
            label: 'Email'
          }
        ],
        actions: []
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
      email: {
        label: 'Email',
        component: {
          type: 'input',
          configuration: {
            type: 'email'
          }
        }
      }
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Education',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'createdAt',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: [
              '/id',
              '/createdAt',
              '/title',
              '/content',
              '/shortDescription',
              '/imageUrl'
            ]
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title',
            sortable: true
          },
          {
            key: '/shortDescription',
            label: 'Short Description'
          }
        ]
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        createdAt: {
          type: 'number'
        },
        title: {
          type: 'string'
        },
        content: {
          type: 'string'
        },
        shortDescription: {
          type: 'string'
        },
        imageUrl: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      createdAt: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        }
      },
      title: {
        label: 'Title'
      },
      shortDescription: {
        label: 'Short Description'
      },
      content: {
        label: 'Content',
        component: {
          type: 'tinymce'
        }
      },
      imageUrl: {
        label: 'Slika',
        component: {
          type: 'image',
          configuration: {
            maxSize: 10485760
          }
        }
      }
    }
  },
  {
    id: 'resources',
    name: 'Resources',
    description: 'Resources',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/name', '/url', 'content']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/name',
            label: 'Name',
            sortable: true
          },
          {
            key: '/url',
            label: 'Url'
          }
        ]
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        content: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name'
      },
      url: {
        label: 'Url'
      },
      content: {
        label: 'Content',
        component: {
          type: 'tinymce'
        }
      }
    }
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Projects',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: [
              '/id',
              '/shortName',
              '/description',
              '/coordinatingInstitution',
              '/category'
            ]
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/shortName',
            label: 'Name',
            sortable: true
          },
          {
            key: '/coordinatingInstitution',
            label: 'Coordinating Institution'
          },
          {
            key: '/category',
            label: 'Category'
          }
        ]
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        shortName: {
          type: 'string'
        },
        coordinatingInstitution: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        category: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      shortName: {
        label: 'Short Name'
      },
      coordinatingInstitution: {
        label: 'Coordinating Institution'
      },
      description: {
        label: 'Description'
      },
      category: {
        label: 'Category',
        component: {
          type: 'select',
          configuration: {
            multiple: false,
            dataSet: [
              '1) Diversity of the human glycome',
              '2) Inter-individual variability of the human body fluid glycome',
              '3) Inter-individual variability of the human tissue glycome',
              '4) Functional relevance and the regulation of the human glycome',
              '5) Analytical methods and standards for glycoscience',
            ]
          }
        }
      }
    }
  },
  {
    id: 'glyco-databases',
    name: 'Glyco Databases',
    description: 'Glyco Databases',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/name', '/link']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/name',
            label: 'Name',
            sortable: true
          },
          {
            key: '/link',
            label: 'Link'
          }
        ],
        actions: []
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        link: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name'
      },
      link: {
        label: 'Link'
      }
    }
  },
  {
    id: 'associate-members',
    name: 'Associate Members',
    description: 'Associate Members',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/name', '/link']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/name',
            label: 'Name',
            sortable: true
          },
          {
            key: '/link',
            label: 'Link'
          }
        ],
        actions: []
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        link: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        label: 'ID'
      },
      name: {
        label: 'Name'
      },
      link: {
        label: 'Link'
      }
    }
  },
  {
    id: 'full-members',
    name: 'Full Member',
    description: 'Full Members',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'title',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/title', '/fullName', '/institution', '/email', '/link']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title',
            sortable: true
          },
          {
            key: '/fullName',
            label: 'Full Name'
          },
          {
            key: '/institution',
            label: 'Institution'
          }
        ],
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        fullName: {
          type: 'string'
        },
        institution: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        link: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        label: 'Id'
      },
      fullName: {
        label: 'Full Name'
      },
      institution: {
        label: 'Institution'
      },
      email: {
        label: 'Email'
      },
      link: {
        label: 'Link'
      }
    }
  },
  {
    id: 'news',
    name: 'News',
    description: 'News',
    authorization: {
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'title',
        direction: 'desc'
      },
      instance: {
        segments: [
          {
            fields: ['/id', '/title', '/url', '/description', '/featuredImage', '/shortDescription', '/gallery', '/sendMail']
          }
        ]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title'
          },
          {
            key: '/sendMail',
            label: 'Send Mail'
          }
        ],
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        shortDescription: {
          type: 'string'
        },
        featuredImage: {
          type: 'string'
        },
        gallery: {
          type: 'array'
        }
      }
    },
    definitions: {
      id: {
        label: 'Id'
      },
      title: {
        label: 'Title'
      },
      url: {
        label: 'Url'
      },
      description: {
        label: 'Description'
      },
      shortDescription: {
        label: 'Short Description'
      },
      featuredImage: {
        label: 'Featured Image'
      },
      gallery: {
        label: 'Gallery',
        component: {
          configuration: {
            allowServerUpload: true,
            allowUrl: true,
            generatedImages: [{
              filePrefix: 'thumb_m_',
              width: 320,
              height: 320
            }],
            maxSize: 10485760
          },
          type: 'gallery'
        }
      }
    }
  },
];

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

/**
 * Add your firebase config
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://human-glycome.firebaseio.com'
});

async function exec() {
  const fStore = admin.firestore();

  for (const collection of COLLECTIONS) {
    for (const document of collection.documents) {
      const {id, ...data} = document;

      await fStore
        .collection(collection.name)
        .doc(id)
        .set(data);
    }
  }

  for (const module of MODULES) {
    const {id, ...data} = module;

    await fStore
      .collection('modules')
      .doc(id)
      .set({
        ...data,
        createdOn: Date.now()
      });
  }
}

exec()
  .then(() => {
    console.log('Setup completely successfully');
  })
  .catch(error => {
    console.error(error);
  });
