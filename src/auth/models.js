
// Forms
const UserSignIn = ({ context: { _t } }) => ({
  type: 'object',
  name: 'user_sign_in',
  resource_name: 'auth/login',
  title: _t('Sign In'),
  properties: {
    username: {
      title: _t('Username'),
      type: 'string'
    },
    password: {
      title: _t('Password'),
      type: 'string'
    }
  },
  required: [ 'username', 'password' ],
  form: [ 'username', { key: 'password', attrs: { type: 'password' } } ]
})

const UserSignOut = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'user_sign_out',
  resource_name: 'auth/logout'
})

const UserForgetPassword = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'user_forgot_password',
  resource_name: 'auth/password/reset',
  title: _t('Forgot password'),
  properties: {
    email: {
      title: _t('Register Email'),
      type: 'string'
    }
  },
  required: [ 'email' ]
})

const UserResetPassword = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'user_reset_password',
  resource_name: 'auth/password/reset/confirm',
  title: _t('Reset Password'),
  properties: {
    new_password1: {
      title: _t('New Password'),
      type: 'string'
    },
    new_password2: {
      title: _t('Repeat Password'),
      type: 'string',
      constant: { $data: '1/new_password1', constantName: _t('New Password') }
    },
    token: {
      type: 'string'
    },
    uid: {
      type: 'string'
    }
  },
  form: [ 
    { key: 'new_password1', attrs: { type: 'password' } },
    { key: 'new_password2', attrs: { type: 'password' } } 
  ]
})

const UserChangePassword = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'user_change_password',
  resource_name: 'auth/password/change',
  title: 'Reset Password',
  properties: {
    old_password: {
      title: 'Old Password',
      type: 'string',
      format: 'password'
    },
    new_password1: {
      title: 'New Password',
      type: 'string'
    },
    new_password2: {
      title: 'Repeat Password',
      type: 'string',
      constant: { $data: '1/new_password1', constantName: _t('New Password') }
    }
  },
  form: [ 
    { key: 'old_password', attrs: { type: 'password' } },
    { key: 'new_password1', attrs: { type: 'password' } },
    { key: 'new_password2', attrs: { type: 'password' } } 
  ]
})

const UserSignUp = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'user_sign_up',
  resource_name: 'auth/registration',
  title: _t('Sign Up'),
  properties: {
    username: {
      title: _t('User Name'),
      type: 'string'
    },
    email: {
      title: _t('Email'),
      type: 'string'
    },
    password1: {
      title: _t('Password'),
      type: 'string'
    },
    password2: {
      title: _t('Repeat Password'),
      type: 'string',
      constant: { $data: '1/password1', constantName: _t('Password') }
    }
  },
  permission: { add: true },
  required: [ 'username', 'email', 'password1', 'password2' ],
  form: [ 
    'username', 
    'email', 
    { key: 'password1', attrs: { type: 'password' } },
    { key: 'password2', attrs: { type: 'password' } } 
  ]
})

// Models
const Permission = ({ context: { _t } }) => ({ 
  type: 'object',
  name: 'auth_permission',
  resource_name: 'auth/permission',
  title: _t('Permission'),
  icon: 'key',
  properties: {
    name: {
      title: _t('Name'),
      type: 'string'
    },
    description: {
      title: _t('Description'),
      type: 'string'
    }
  }
})

const Role = (app) => {
  const { _t } = app.context
  return { 
    type: 'object',
    name: 'auth_role',
    resource_name: 'auth/role',
    title: _t('Role'),
    icon: 'group',
    properties: {
      name: {
        title: _t('Name'),
        type: 'string'
      },
      permissions: {
        title: _t('Permission'),
        type: 'array',
        items: Permission(app)
      }
    }
  }
}

const User = (app) => {
  const { _t } = app.context
  return { 
    type: 'object',
    name: 'auth_user',
    resource_name: 'user',
    title: _t('User'),
    icon: 'user',
    properties: {
      username: {
        title: _t('Name'),
        type: 'string'
      },
      email: {
        title: _t('Email'),
        type: 'string'
      },
      emailVerified: {
        type: 'boolean',
        title: _t('Email Verified')
      },
      is_superuser: {
        type: 'boolean',
        title: _t('Is SuperUser')
      },
      date_joined: {
        type: 'string',
        format: 'date',
        title: _t('Date Joined')
      },
      permissions: {
        title: _t('Permission'),
        type: 'array',
        items: Permission(app)
      },
      roles: {
        title: _t('Role'),
        type: 'array',
        items: Role(app)
      }
    },
    list_display: [ 'username', 'email', 'is_superuser', 'date_joined' ],
    form: [ 'username', 'email', 'is_superuser' ],
    permission: { view: true, add: true, edit: true, delete: true }
  }
}

export default (app) => {
  return {
    auth_user: User(app),
    auth_permission: Permission(app),
    auth_role: Role(app)
  }
}

export {
  UserSignIn,
  UserSignOut,
  UserForgetPassword,
  UserResetPassword,
  UserChangePassword,
  UserSignUp
}
