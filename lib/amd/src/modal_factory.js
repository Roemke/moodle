// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Create a modal.
 *
 * @module     core/modal_factory
 * @class      modal_factory
 * @package    core
 * @copyright  2016 Ryan Wyllie <ryan@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define(['jquery', 'core/modal_events', 'core/modal_registry', 'core/modal',
        'core/modal_save_cancel', 'core/modal_confirm', 'core/modal_cancel',
        'core/templates', 'core/notification', 'core/custom_interaction_events'],
    function($, ModalEvents, ModalRegistry, Modal, ModalSaveCancel, ModalConfirm,
        ModalCancel, Templates, Notification, CustomEvents) {

    // The templates for each type of modal.
    var TEMPLATES = {
        DEFAULT: 'core/modal',
        SAVE_CANCEL: 'core/modal_save_cancel',
        CONFIRM: 'core/modal_confirm',
        CANCEL: 'core/modal_cancel',
    };

    // The available types of modals.
    var TYPES = {
        DEFAULT: 'DEFAULT',
        SAVE_CANCEL: 'SAVE_CANCEL',
        CONFIRM: 'CONFIRM',
        CANCEL: 'CANCEL',
    };

    // Register the common set of modals.
    ModalRegistry.register(TYPES.DEFAULT, Modal, TEMPLATES.DEFAULT);
    ModalRegistry.register(TYPES.SAVE_CANCEL, ModalSaveCancel, TEMPLATES.SAVE_CANCEL);
    ModalRegistry.register(TYPES.CONFIRM, ModalConfirm, TEMPLATES.CONFIRM);
    ModalRegistry.register(TYPES.CANCEL, ModalCancel, TEMPLATES.CANCEL);

    /**
     * Set up the events required to show the modal and return focus when the modal
     * is closed.
     *
     * @method setUpTrigger
     * @param {object} modal The modal instance
     * @param {object} triggerElement The jQuery element to open the modal
     */
    var setUpTrigger = function(modal, triggerElement) {
        if (typeof triggerElement != 'undefined') {
            CustomEvents.define(triggerElement, [CustomEvents.events.activate]);
            triggerElement.on(CustomEvents.events.activate, function(e, data) {
                modal.show();
                data.originalEvent.preventDefault();
            });

            modal.getRoot().on(ModalEvents.hidden, function() {
                triggerElement.focus();
            });
        }
    };

    /**
     * Create the correct instance of a modal based on the givem type. Sets up
     * the trigger between the modal and the trigger element.
     *
     * @method createFromElement
     * @param {object} registryConf A config from the ModalRegistry
     * @param {object} modalElement The modal HTML jQuery object
     * @param {object} triggerElement The trigger HTML jQuery object
     * @return {object} Modal instance
     */
    var createFromElement = function(registryConf, modalElement, triggerElement) {
        modalElement = $(modalElement);
        var module = registryConf.module;
        var modal = new module(modalElement);
        setUpTrigger(modal, triggerElement);

        return modal;
    };

    /**
     * Create the correct modal instance for the given type, including loading
     * the correct template and setting up the trigger relationship with the
     * trigger element.
     *
     * @method createFromType
     * @param {object} registryConf A config from the ModalRegistry
     * @param {object} triggerElement The trigger HTML jQuery object
     * @return {promise} Resolved with a Modal instance
     */
    var createFromType = function(registryConf, templateContext, triggerElement) {
        var templateName = registryConf.template;

        return Templates.render(templateName, templateContext)
            .then(function(html) {
                var modalElement = $(html);
                return createFromElement(registryConf, modalElement, triggerElement);
            })
            .fail(Notification.exception);
    };

    /**
     * Create a Modal instance.
     *
     * @method create
     * @param {object} modalConfig The configuration to create the modal instance
     * @param {object} triggerElement The trigger HTML jQuery object
     * @return {promise} Resolved with a Modal instance
     */
    var create = function(modalConfig, triggerElement) {
        var type = modalConfig.type || TYPES.DEFAULT;
        var isLarge = modalConfig.large ? true : false;
        var registryConf = null;
        var templateContext = {};

        registryConf = ModalRegistry.get(type);

        if (!registryConf) {
            Notification.exception({message: 'Unable to find modal of type: ' + type});
        }

        if (typeof modalConfig.templateContext != 'undefined') {
            templateContext = modalConfig.templateContext;
        }

        return createFromType(registryConf, templateContext, triggerElement)
            .then(function(modal) {
                if (typeof modalConfig.title != 'undefined') {
                    modal.setTitle(modalConfig.title);
                }

                if (typeof modalConfig.body != 'undefined') {
                    modal.setBody(modalConfig.body);
                }

                if (typeof modalConfig.footer != 'undefined') {
                    modal.setFooter(modalConfig.footer);
                }

                if (isLarge) {
                    modal.setLarge();
                }

                return modal;
            });
    };

    return {
        create: create,
        types: TYPES,
    };
});