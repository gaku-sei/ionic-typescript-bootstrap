/// <reference path="../../typings/tsd.d.ts" />

import {DashCtrl, ChatsCtrl, ChatDetailCtrl, AccountCtrl} from 'controllers';
import {Chats} from 'services';

angular.module('chat', ['ionic'])
  .service('Chats', Chats)
  .controller('DashCtrl', DashCtrl)
  .controller('ChatsCtrl', ChatsCtrl)
  .controller('ChatDetailCtrl', ChatDetailCtrl)
  .controller('AccountCtrl', AccountCtrl)

  .config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl as dash'
          }
        }
      })

      .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl as chats'
            }
          }
        })

      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl as chatDetail'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl as account'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/dash');
  })

  .run(($ionicPlatform: ionic.platform.IonicPlatformService) => {
    $ionicPlatform.ready(() => {
      if(window.StatusBar) {
        window.StatusBar.styleLightContent();
      }
    });
  });

angular.bootstrap(window.document.body, ['chat']);
