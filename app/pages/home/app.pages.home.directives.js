/* 
 * Copyright (C) 2016 Travis J. Neal
 *
 * Source:  https://github.com/iam-decoder/SimpleAngularApp
 * License: http://www.gnu.org/licenses/gpl.html
 * Author:  Travis J. Neal
 * Web:     https://github.com/iam-decoder
 *
 * This work is licensed under the Creative Commons GNU GPL v3 License.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function (ng) {
    ng.module('simpleImple')
    .directive('ngModelOnblur', function () {
        return {
            priority: 1,
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attribute, parent) {
                if(!scope.applyChanges){
                    scope.applyChanges = function($event){
                        if($event && $event.keyCode !== 13) return;
                        scope.$apply(function () {
                            parent.$setViewValue(element.val());
                        });
                    };
                }
                if (attribute.type === 'radio' || attribute.type === 'checkbox')
                    return;

                element.off('input keydown change');
                element.on('blur', function () {
                    scope.applyChanges();
                });
                element.bind('keyup', function(e){
                    if(e.which === 13){
                        scope.applyChanges();
                    }
                });
            }
        };
    })
    .directive('ngSetName', [function () {
        return {
            restrict: "AE",
            template: '<input type="text" ng-model="greeting.name" ng-value="greeting.name" ng-model-onblur />'
        };
    }])
    .directive('ngGreeting', [function () {
        return {
            restrict: "AE",
            link: function (scope) {
                if (!scope.greeting) {
                    scope.greeting = {};
                }
                var hour = (new Date()).getHours();
                if (6 <= hour && hour < 12) {
                    scope.greeting.part_of_day = "Morning";
                } else if (12 <= hour && hour < 17) {
                    scope.greeting.part_of_day = "Afternoon";
                } else if ((17 <= hour && hour < 23) || (0 <= hour && hour < 6)) {
                    scope.greeting.part_of_day = "Evening";
                }
            },
            template: function () {
                return '<span ng-if="greeting.name">Hello, {{greeting.name}}! I hope you\'re having a wonderful {{greeting.part_of_day}}.</span>';
            }
        };
    }]);
})(angular);