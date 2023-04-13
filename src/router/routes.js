
const routes = [
  {
    path: '/onboarding',
    component: () => import('layouts/OnBoardingLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'users',
            component: () => import('pages/UsersPage.vue')
          },
          {
            path: ':id',
            name: 'usersDetail',
            component: () => import('pages/UsersDetailPage.vue')
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            name: 'chats',
            component: () => import('pages/ChatsPage.vue')
          }
        ]
      },
      {
        path: '',
        name: 'entry',
        component: () => import('pages/IndexPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
