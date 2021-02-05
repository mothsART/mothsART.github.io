(function ($) {
    'use strict';

    var isSupported = function () {
        return typeof FileReader !== 'undefined';
    };

    var isValidSound = function (type) {
        return /^data:audio\/[a-z]?/i.test(type);
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                insertAudio: 'Insert Sound',
                file: 'File',
                errInvalidSound: 'Invalid sound file.'
            },
            fr: {
                insertAudio: 'Insérer un son',
                file: 'Fichier',
                errInvalidSound: 'Invalid sound file.'
            },
        },
        plugins: {
            insertAudio: {
                shouldInit: isSupported,
                init: function (trumbowyg) {
                    var btnDef = {
                        isSupported: isSupported,
                        fn: function () {
                            trumbowyg.saveRange();

                            var file;
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.insertAudio,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'audio/*'
                                        }
                                    },
                                    alt: {
                                        label: 'description',
                                        value: trumbowyg.getRangeText()
                                    }
                                },

                                // Callback
                                function (values) {
                                    var fReader = new FileReader();

                                    fReader.onloadend = function (e) {
                                        if (isValidSound(e.target.result)) {
                                            trumbowyg.execCmd(
                                                'insertHTML', 
                                                '<audio controls src="' + fReader.result + '" alt="' + values.alt + '" >',
                                                false,
                                                true
                                            );
                                            trumbowyg.closeModal();
                                        } else {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                trumbowyg.lang.errInvalidSound
                                            );
                                        }
                                    };

                                    fReader.readAsDataURL(file);
                                }
                            );

                            $('input[type=file]').on('change', function (e) {
                                file = e.target.files[0];
                            });
                        }
                    };

                    trumbowyg.addBtnDef('insertAudio', btnDef);
                }
            }
        }
    });
})(jQuery);
