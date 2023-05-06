try {
    (() => {
        const __$$app$$__ = __$$hmAppManager$$__.currentApp;
        function getApp() {
            return __$$app$$__.app;
        }
        function getCurrentPage() {
            return __$$app$$__.current && __$$app$$__.current.module;
        }
        const __$$module$$__ = __$$app$$__.current;
        const h = new DeviceRuntimeCore.WidgetFactory(new DeviceRuntimeCore.HmDomApi(__$$app$$__, __$$module$$__));
        const {px} = __$$app$$__.__globals__;
        let normal$_$text_8a2f487170634e19b5d8b563ac33218e = '';
        let normal$_$text_b1525f24049740338f2233271e1dfcd7 = '';
        let normal$_$text_4357ec1eea6b4414a823a14627323da7 = '';
        let normal$_$text_0c7e324abe644d3eb73f299d6835cc83 = '';
        let normal$_$text_e5a5170097e14e5f9be70c01d30d09a7 = '';
        let dateFormat = '';
        let dateFormatMap = '';
        let batterySensor = '';
        let timeSensor = '';
        let heartSensor = '';
        let stepSensor = '';
        const logger = Logger.getLogger('watchface6');
        __$$module$$__.module = DeviceRuntimeCore.WatchFace({
            init_view() {
                hmUI.createWidget(hmUI.widget.FILL_RECT, {
                    x: 0,
                    y: 0,
                    w: 416,
                    h: 416,
                    color: '0xFF000000',
                    radius: 208,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                normal$_$text_8a2f487170634e19b5d8b563ac33218e = hmUI.createWidget(hmUI.widget.TEXT, {
                    x: 104,
                    y: 33,
                    w: 209,
                    h: 40,
                    text: 'BATT: [BATT_PER] %',
                    color: '0xFF15f00d',
                    text_size: 36,
                    text_style: hmUI.text_style.NONE,
                    align_h: hmUI.align.CENTER_H,
                    align_v: hmUI.align.CENTER_V,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                normal$_$text_b1525f24049740338f2233271e1dfcd7 = hmUI.createWidget(hmUI.widget.TEXT, {
                    x: 0,
                    y: 158,
                    w: 416,
                    h: 102,
                    text: '[HOUR_24_Z]:[MIN_Z]:[SEC_Z]',
                    color: '0xFFffffff',
                    text_size: 90,
                    text_style: hmUI.text_style.NONE,
                    align_h: hmUI.align.CENTER_H,
                    align_v: hmUI.align.CENTER_V,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                normal$_$text_4357ec1eea6b4414a823a14627323da7 = hmUI.createWidget(hmUI.widget.TEXT, {
                    x: 118,
                    y: 339,
                    w: 180,
                    h: 42,
                    text: 'HR:  [HR]',
                    color: '0xFFf22424',
                    text_size: 36,
                    text_style: hmUI.text_style.NONE,
                    align_h: hmUI.align.CENTER_H,
                    align_v: hmUI.align.CENTER_V,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                normal$_$text_0c7e324abe644d3eb73f299d6835cc83 = hmUI.createWidget(hmUI.widget.TEXT, {
                    x: 83,
                    y: 289,
                    w: 250,
                    h: 42,
                    text: 'STEPS:  [SC]',
                    color: '0xFF40d0dd',
                    text_size: 36,
                    text_style: hmUI.text_style.NONE,
                    align_h: hmUI.align.CENTER_H,
                    align_v: hmUI.align.CENTER_V,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                normal$_$text_e5a5170097e14e5f9be70c01d30d09a7 = hmUI.createWidget(hmUI.widget.TEXT, {
                    x: 40,
                    y: 96,
                    w: 337,
                    h: 40,
                    text: 'DATE: [DAY_Z].[MON_Z].[YEAR]',
                    color: '0xFFffffff',
                    text_size: 36,
                    text_style: hmUI.text_style.NONE,
                    align_h: hmUI.align.CENTER_H,
                    align_v: hmUI.align.CENTER_V,
                    show_level: hmUI.show_level.ONLY_NORMAL
                });
                if (!batterySensor) {
                    batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);
                }
                if (!timeSensor) {
                    timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
                }
                if (!heartSensor) {
                    heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
                }
                if (!stepSensor) {
                    stepSensor = hmSensor.createSensor(hmSensor.id.STEP);
                }
                batterySensor.addEventListener(hmSensor.event.CHANGE, function () {
                    normal$_$text_8a2f487170634e19b5d8b563ac33218e.setProperty(hmUI.prop.MORE, { text: `BATT: ${ batterySensor.current } %` });
                }), timeSensor.addEventListener(timeSensor.event.MINUTEEND, function () {
                    normal$_$text_b1525f24049740338f2233271e1dfcd7.setProperty(hmUI.prop.MORE, { text: `${ String(timeSensor.hour).padStart(2, '0') }:${ String(timeSensor.minute).padStart(2, '0') }:${ String(timeSensor.second).padStart(2, '0') }` });
                }), heartSensor.addEventListener(heartSensor.event.LAST, function () {
                    normal$_$text_4357ec1eea6b4414a823a14627323da7.setProperty(hmUI.prop.MORE, { text: `HR:  ${ heartSensor.last }` });
                }), stepSensor.addEventListener(hmSensor.event.CHANGE, function () {
                    normal$_$text_0c7e324abe644d3eb73f299d6835cc83.setProperty(hmUI.prop.MORE, { text: `STEPS:  ${ stepSensor.current }` });
                }), timeSensor.addEventListener(timeSensor.event.DAYCHANGE, function () {
                    dateFormat = hmSetting.getDateFormat();
                    dateFormatMap = [
                        () => {
                            normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ timeSensor.year }.${ String(timeSensor.month).padStart(2, '0') }.${ String(timeSensor.day).padStart(2, '0') }` });
                        },
                        () => {
                            normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ String(timeSensor.day).padStart(2, '0') }.${ String(timeSensor.month).padStart(2, '0') }.${ timeSensor.year }` });
                        },
                        () => {
                            normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ String(timeSensor.month).padStart(2, '0') }.${ String(timeSensor.day).padStart(2, '0') }.${ timeSensor.year }` });
                        }
                    ];
                    dateFormatMap[dateFormat]();
                });
                normal$_$text_b1525f24049740338f2233271e1dfcd7.setProperty(hmUI.prop.MORE, { text: `${ String(timeSensor.hour).padStart(2, '0') }:${ String(timeSensor.minute).padStart(2, '0') }:${ String(timeSensor.second).padStart(2, '0') }` });
                timer.createTimer(0, 1000, function (timeSensor2) {
                    normal$_$text_b1525f24049740338f2233271e1dfcd7.setProperty(hmUI.prop.MORE, { text: `${ String(timeSensor2.hour).padStart(2, '0') }:${ String(timeSensor2.minute).padStart(2, '0') }:${ String(timeSensor2.second).padStart(2, '0') }` });
                }, timeSensor);
                hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
                    resume_call: function () {
                        normal$_$text_8a2f487170634e19b5d8b563ac33218e.setProperty(hmUI.prop.MORE, { text: `BATT: ${ batterySensor.current } %` });
                        normal$_$text_b1525f24049740338f2233271e1dfcd7.setProperty(hmUI.prop.MORE, { text: `${ String(timeSensor.hour).padStart(2, '0') }:${ String(timeSensor.minute).padStart(2, '0') }:${ String(timeSensor.second).padStart(2, '0') }` });
                        normal$_$text_4357ec1eea6b4414a823a14627323da7.setProperty(hmUI.prop.MORE, { text: `HR:  ${ heartSensor.last }` });
                        normal$_$text_0c7e324abe644d3eb73f299d6835cc83.setProperty(hmUI.prop.MORE, { text: `STEPS:  ${ stepSensor.current }` });
                        dateFormat = hmSetting.getDateFormat();
                        dateFormatMap = [
                            () => {
                                normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ timeSensor.year }.${ String(timeSensor.month).padStart(2, '0') }.${ String(timeSensor.day).padStart(2, '0') }` });
                            },
                            () => {
                                normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ String(timeSensor.day).padStart(2, '0') }.${ String(timeSensor.month).padStart(2, '0') }.${ timeSensor.year }` });
                            },
                            () => {
                                normal$_$text_e5a5170097e14e5f9be70c01d30d09a7.setProperty(hmUI.prop.MORE, { text: `DATE: ${ String(timeSensor.month).padStart(2, '0') }.${ String(timeSensor.day).padStart(2, '0') }.${ timeSensor.year }` });
                            }
                        ];
                        dateFormatMap[dateFormat]();
                    }
                });
            },
            onInit() {
                logger.log('index page.js on init invoke');
            },
            build() {
                this.init_view();
                logger.log('index page.js on ready invoke');
            },
            onDestroy() {
                logger.log('index page.js on destroy invoke');
            }
        });
        ;
    })();
} catch (e) {
    console.log('Mini Program Error', e);
    e && e.stack && e.stack.split(/\n/).forEach(i => console.log('error stack', i));
    ;
}