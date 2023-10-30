/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var iot;
(function (iot) {
    class Acknowledge {
        constructor() {
            this.instructions = (new Array());
            if (this.mac === undefined) {
                this.mac = null;
            }
        }
    }
    iot.Acknowledge = Acknowledge;
    Acknowledge["__class"] = "iot.Acknowledge";
})(iot || (iot = {}));
(function (iot) {
    class Action {
        constructor() {
            if (this.id === undefined) {
                this.id = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.mac === undefined) {
                this.mac = null;
            }
            if (this.description === undefined) {
                this.description = null;
            }
            if (this.owner === undefined) {
                this.owner = null;
            }
        }
    }
    iot.Action = Action;
    Action["__class"] = "iot.Action";
})(iot || (iot = {}));
(function (iot) {
    let ActionListener;
    (function (ActionListener) {
        ActionListener.GET_DEVICE = "get-device";
        ActionListener.ACKNOWLEDGE = "acknowledge";
        ActionListener.ADD_INSTRUCTION = "add-instruction";
        ActionListener.START = "start";
    })(ActionListener = iot.ActionListener || (iot.ActionListener = {}));
})(iot || (iot = {}));
(function (iot) {
    class Device {
        constructor() {
            if (this.mac === undefined) {
                this.mac = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.description === undefined) {
                this.description = null;
            }
            if (this.status === undefined) {
                this.status = null;
            }
            if (this.owner === undefined) {
                this.owner = null;
            }
            this.microController = "esp32";
            if (this.category === undefined) {
                this.category = null;
            }
        }
    }
    iot.Device = Device;
    Device["__class"] = "iot.Device";
})(iot || (iot = {}));
(function (iot) {
    class DeviceWrapper {
        constructor() {
            if (this.device === undefined) {
                this.device = null;
            }
            this.actions = (new Array());
            this.parameters = (new Array());
        }
        getParameter(name) {
            for (let index321 = 0; index321 < this.parameters.length; index321++) {
                let p = this.parameters[index321];
                {
                    if (p.name === name) {
                        return p;
                    }
                }
            }
            return null;
        }
        getAction(name) {
            for (let index322 = 0; index322 < this.actions.length; index322++) {
                let a = this.actions[index322];
                {
                    if (a.name === name) {
                        return a;
                    }
                }
            }
            return null;
        }
    }
    iot.DeviceWrapper = DeviceWrapper;
    DeviceWrapper["__class"] = "iot.DeviceWrapper";
})(iot || (iot = {}));
(function (iot) {
    class Instruction {
        constructor() {
            if (this.id === undefined) {
                this.id = null;
            }
            if (this.mac === undefined) {
                this.mac = null;
            }
            if (this.actionName === undefined) {
                this.actionName = null;
            }
            if (this.parameterName === undefined) {
                this.parameterName = null;
            }
            if (this.parameterValue === undefined) {
                this.parameterValue = null;
            }
            if (this.status === undefined) {
                this.status = null;
            }
        }
    }
    iot.Instruction = Instruction;
    Instruction["__class"] = "iot.Instruction";
})(iot || (iot = {}));
(function (iot) {
    class Main {
        static main(args) {
            const href = window.location.href;
            if ( /* contains */(href.indexOf("control.html") != -1)) {
                const api = iot.WIkIOTApi.getInstance$java_lang_String(Main.server);
                const app = new iot.ui.App();
                app.render();
            }
            else {
                const api = iot.simulation.WIkiotDeviceAPI.getInstance$java_lang_String(Main.server);
                const app = new iot.simulation.App();
                app.render();
            }
        }
    }
    Main.server = "wss://wikiot-8b90821c8c23.herokuapp.com/ws/acknowledge";
    iot.Main = Main;
    Main["__class"] = "iot.Main";
})(iot || (iot = {}));
(function (iot) {
    class Parameter {
        constructor() {
            if (this.id === undefined) {
                this.id = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.direction === undefined) {
                this.direction = null;
            }
            if (this.mac === undefined) {
                this.mac = null;
            }
            if (this.actionName === undefined) {
                this.actionName = null;
            }
            if (this.paramType === undefined) {
                this.paramType = null;
            }
            if (this.values === undefined) {
                this.values = null;
            }
            if (this.description === undefined) {
                this.description = null;
            }
            if (this.owner === undefined) {
                this.owner = null;
            }
            if (this.currentValue === undefined) {
                this.currentValue = null;
            }
            if (this.lastModifiedDate === undefined) {
                this.lastModifiedDate = null;
            }
        }
    }
    iot.Parameter = Parameter;
    Parameter["__class"] = "iot.Parameter";
})(iot || (iot = {}));
(function (iot) {
    var simulation;
    (function (simulation) {
        class App extends JSContainer {
            constructor() {
                super("div");
                this.devices = new iot.simulation.UIDevices();
                this.addChild(this.devices);
                this.devices.addDevice(iot.ui.Samples.buildDominoSwith("12931852", 4));
            }
        }
        simulation.App = App;
        App["__class"] = "iot.simulation.App";
        App["__interfaces"] = ["framework.components.api.Renderable"];
    })(simulation = iot.simulation || (iot.simulation = {}));
})(iot || (iot = {}));
(function (iot) {
    var simulation;
    (function (simulation) {
        class UIDevice extends com.spoonconsulting.lightning.LayoutItem {
            constructor(wrapper) {
                super(wrapper.device.mac, "div");
                this.card = new com.spoonconsulting.lightning.Card("device", "div");
                this.name = new JSContainer("name", "div");
                this.description = new JSContainer("description", "p");
                this.img = new JSContainer("img", "img");
                this.parameters = new com.spoonconsulting.lightning.LayoutItem("parameters", "div");
                this.status = new com.spoonconsulting.lightning.Badge("status");
                this.addChild(this.card);
                this.setSize(4);
                this.setSmallDeviceSize(12);
                this.setLargeDeviceSize(3);
                this.setMediumDeviceSize(4);
                this.card.getActions().addChild(this.status);
                const layout = new com.spoonconsulting.lightning.Layout("div", "div");
                layout.setMultipleRows(true);
                const left = new com.spoonconsulting.lightning.LayoutItem("left", "div");
                left.setSize(3);
                left.setSmallDeviceSize(12);
                left.setMediumDeviceSize(3);
                left.setLargeDeviceSize(3);
                left.setPadding(com.spoonconsulting.lightning.enums.LayoutItemPadding.AROUND_SMALL);
                layout.addChild(left);
                const right = new com.spoonconsulting.lightning.LayoutItem("right", "div");
                right.setSize(9);
                right.setSmallDeviceSize(12);
                right.setMediumDeviceSize(9);
                right.setMediumDeviceSize(9);
                layout.addChild(right);
                this.parameters.setSize(12);
                layout.addChild(this.parameters);
                left.addChild(this.img);
                right.addChild(this.description);
                this.card.getBody().addChild(layout);
                this.img.setStyle("width", "auto");
                this.parameters.addClass("slds-grid slds-wrap");
                this.addEventListener(new UIDevice.UIDevice$0(this), "change");
                iot.simulation.WIkiotDeviceAPI.getInstance$().addOnDeviceUpdateListener((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (device) => (funcInst['onUpdate'] ? funcInst['onUpdate'] : funcInst).call(funcInst, device); })(this)));
                iot.simulation.WIkiotDeviceAPI.getInstance$().addExecutor((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (instruction, currentValue) => (funcInst['doExecute'] ? funcInst['doExecute'] : funcInst).call(funcInst, instruction, currentValue); })(this)));
                iot.simulation.WIkiotDeviceAPI.getInstance$().start(wrapper);
                this.setDevice(wrapper);
            }
            setDevice(device) {
                if (this.card.getTitle() !== device.device.name) {
                    this.card.setTitle(device.device.name);
                }
                if (this.name.getHtml() !== device.device.name) {
                    this.name.setHtml(device.device.name);
                }
                if (this.status.getLabel() !== device.device.status) {
                    this.status.setLabel(device.device.status);
                }
                if (this.description.getHtml() !== device.device.description) {
                    this.description.setHtml(device.device.description);
                }
                if (this.img.getAttribute("src") !== "https://m.media-amazon.com/images/I/71vRKosm7yL.jpg") {
                    this.img.setAttribute("src", "https://m.media-amazon.com/images/I/71vRKosm7yL.jpg");
                }
                if (this.parameters.getChildren().length === 0 || this.parameters.getChildren().length !== device.parameters.length) {
                    this.parameters.clearChildren();
                    this.parameters.setRendered(false);
                    for (let index323 = 0; index323 < device.parameters.length; index323++) {
                        let param = device.parameters[index323];
                        {
                            const ui = new iot.simulation.UIParameter(param.name);
                            ui.setParameter(param);
                            this.parameters.addChild(ui);
                        }
                    }
                }
                else {
                    for (let index324 = 0; index324 < device.parameters.length; index324++) {
                        let param = device.parameters[index324];
                        {
                            const ui = this.parameters.getChild(param.name);
                            ui.setParameter(param);
                        }
                    }
                }
            }
            getUIParameter(name) {
                return this.parameters.getChild(name);
            }
            /**
             *
             * @param {iot.DeviceWrapper} device
             */
            onUpdate(device) {
                this.setDevice(device);
                this.fireListener("change", new CustomEvent("change"));
            }
            /**
             *
             * @param {iot.Instruction} instruction
             * @param {iot.Parameter} currentValue
             * @return {iot.Parameter}
             */
            doExecute(instruction, currentValue) {
                alert(JSON.stringify(instruction));
                const pa = this.getUIParameter(instruction.parameterName);
                pa.setNewValue(instruction.parameterValue);
                return currentValue;
            }
        }
        simulation.UIDevice = UIDevice;
        UIDevice["__class"] = "iot.simulation.UIDevice";
        UIDevice["__interfaces"] = ["framework.components.api.Renderable", "iot.simulation.Executor", "iot.OnDeviceUpdate"];
        (function (UIDevice) {
            class UIDevice$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    this.__parent.render();
                }
            }
            UIDevice.UIDevice$0 = UIDevice$0;
            UIDevice$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(UIDevice = simulation.UIDevice || (simulation.UIDevice = {}));
    })(simulation = iot.simulation || (iot.simulation = {}));
})(iot || (iot = {}));
(function (iot) {
    var simulation;
    (function (simulation) {
        class UIDevices extends com.spoonconsulting.lightning.Layout {
            constructor() {
                super("UIDevices", "div");
                this.setMultipleRows(true);
            }
            addDevice(mac) {
                const ui = new iot.simulation.UIDevice(mac);
                this.addChild(ui);
            }
        }
        simulation.UIDevices = UIDevices;
        UIDevices["__class"] = "iot.simulation.UIDevices";
        UIDevices["__interfaces"] = ["framework.components.api.Renderable"];
    })(simulation = iot.simulation || (iot.simulation = {}));
})(iot || (iot = {}));
(function (iot) {
    var simulation;
    (function (simulation) {
        class UIParameter extends com.spoonconsulting.lightning.LayoutItem {
            constructor(name) {
                super(name, "div");
                if (this.parameter === undefined) {
                    this.parameter = null;
                }
                this.description = new JSContainer("p");
                this.tile = new com.spoonconsulting.lightning.Card("tile", "div");
                this.toggle = new com.spoonconsulting.lightning.Toggle(this.getName());
                this.addChild(this.tile);
                this.setSize(12);
                this.tile.getBody().addChild(this.description);
                this.tile.getActions().addChild(this.toggle);
                this.tile.getBody().setStyle("margin-top", "0").setStyle("margin-bottom", "0");
                this.description.setStyle("margin", "-0.6rem 0.2rem 0 1.5rem");
                this.toggle.addEventListener(new UIParameter.UIParameter$0(this), "change");
            }
            setNewValue(val) {
                const togg = this.toggle.getValue();
                if (val === "1" && !togg) {
                    this.toggle.setValue(true);
                }
                else if (val === "0" && togg) {
                    this.toggle.setValue(false);
                }
            }
            setParameter(param) {
                this.parameter = param;
                if (this.tile.getTitle() !== param.name) {
                    this.tile.setTitle(param.name);
                }
                if (this.description.getHtml() !== param.description) {
                    this.description.setHtml(param.description);
                }
                const val = param.currentValue;
                const togg = this.toggle.getValue();
                if (val === "1" && !togg) {
                    this.toggle.setValue(true);
                }
                else if (val === "0" && togg) {
                    this.toggle.setValue(false);
                }
            }
        }
        simulation.UIParameter = UIParameter;
        UIParameter["__class"] = "iot.simulation.UIParameter";
        UIParameter["__interfaces"] = ["framework.components.api.Renderable"];
        (function (UIParameter) {
            class UIParameter$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const currentValue = this.__parent.toggle.getValue() ? "1" : "0";
                    const mac = this.__parent.parameter.mac;
                    const actionName = this.__parent.parameter.actionName;
                    iot.WIkIOTApi.getInstance$().addInstruction(mac, actionName, currentValue);
                }
            }
            UIParameter.UIParameter$0 = UIParameter$0;
            UIParameter$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(UIParameter = simulation.UIParameter || (simulation.UIParameter = {}));
    })(simulation = iot.simulation || (iot.simulation = {}));
})(iot || (iot = {}));
(function (iot) {
    class SocketMessage {
        constructor() {
            this.headers = new Object();
            this.body = null;
        }
    }
    iot.SocketMessage = SocketMessage;
    SocketMessage["__class"] = "iot.SocketMessage";
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui) {
        class App extends JSContainer {
            constructor() {
                super("div");
                this.devices = new iot.ui.UIDevices();
                this.addChild(this.devices);
                this.devices.addDevice("12931852");
            }
        }
        ui.App = App;
        App["__class"] = "iot.ui.App";
        App["__interfaces"] = ["framework.components.api.Renderable"];
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui) {
        class DeviceBuilder {
            constructor() {
                this.result = new iot.DeviceWrapper();
            }
            static New(mac) {
                const b = new DeviceBuilder();
                const device = new iot.Device();
                device.mac = mac;
                b.result.device = device;
                return b;
            }
            build() {
                return this.result;
            }
            description(description) {
                this.result.device.description = description;
                return this;
            }
            name(name) {
                this.result.device.name = name;
                return this;
            }
            parameter() {
                const param = new iot.Parameter();
                param.mac = this.result.device.mac;
                this.result.parameters.push(param);
                const b = new DeviceBuilder.ParameterBuilder(this, param, this);
                return b;
            }
            action() {
                const act = new iot.Action();
                act.mac = this.result.device.mac;
                this.result.actions.push(act);
                return new DeviceBuilder.ActionBuilder(this, this, act);
            }
        }
        ui.DeviceBuilder = DeviceBuilder;
        DeviceBuilder["__class"] = "iot.ui.DeviceBuilder";
        (function (DeviceBuilder) {
            class ActionBuilder {
                constructor(__parent, db, act) {
                    this.__parent = __parent;
                    if (this.db === undefined) {
                        this.db = null;
                    }
                    if (this.act === undefined) {
                        this.act = null;
                    }
                    this.db = db;
                    this.act = act;
                }
                name(name) {
                    this.act.name = name;
                    return this;
                }
                description(description) {
                    this.act.description = description;
                    return this;
                }
                build() {
                    return this.db;
                }
            }
            DeviceBuilder.ActionBuilder = ActionBuilder;
            ActionBuilder["__class"] = "iot.ui.DeviceBuilder.ActionBuilder";
            class ParameterBuilder {
                constructor(__parent, param, db) {
                    this.__parent = __parent;
                    this.param = new iot.Parameter();
                    if (this.db === undefined) {
                        this.db = null;
                    }
                    this.param = param;
                    this.db = db;
                }
                name(name) {
                    this.param.name = name;
                    return this;
                }
                direction(direction) {
                    this.param.direction = direction;
                    return this;
                }
                mac(mac) {
                    this.param.mac = mac;
                    return this;
                }
                actionName(actionName) {
                    this.param.actionName = actionName;
                    return this;
                }
                paramType(paramType) {
                    this.param.paramType = paramType;
                    return this;
                }
                values(values) {
                    this.param.values = values;
                    return this;
                }
                description(description) {
                    this.param.description = description;
                    return this;
                }
                owner(owner) {
                    this.param.owner = owner;
                    return this;
                }
                currentValue(currentValue) {
                    this.param.currentValue = currentValue;
                    return this;
                }
                build() {
                    return this.db;
                }
            }
            DeviceBuilder.ParameterBuilder = ParameterBuilder;
            ParameterBuilder["__class"] = "iot.ui.DeviceBuilder.ParameterBuilder";
        })(DeviceBuilder = ui.DeviceBuilder || (ui.DeviceBuilder = {}));
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui) {
        class Samples {
            static buildDominoSwith(mac, num) {
                const db = iot.ui.DeviceBuilder.New(mac).name("Simulation Switch 4").description("A web based simulator of a switch connected to lamps");
                for (let i = 1; i <= num; i++) {
                    {
                        db.action().name("Switch" + i).description("Switching switch " + i).build().parameter().actionName("Switch" + i).currentValue("0").description("Hold the state of the switch " + i).direction("device-server").name("Switch" + i).paramType("boolean").values("On,Off").build();
                    }
                    ;
                }
                const wrapper = db.build();
                return wrapper;
            }
        }
        ui.Samples = Samples;
        Samples["__class"] = "iot.ui.Samples";
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui) {
        class SMSwitch extends JSContainer {
            constructor(name) {
                super(name, "div");
            }
        }
        ui.SMSwitch = SMSwitch;
        SMSwitch["__class"] = "iot.ui.SMSwitch";
        SMSwitch["__interfaces"] = ["framework.components.api.Renderable"];
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui_1) {
        class UIDevice extends com.spoonconsulting.lightning.LayoutItem {
            constructor(mac) {
                super(mac, "div");
                this.card = new com.spoonconsulting.lightning.Card("device", "div");
                this.name = new JSContainer("name", "div");
                this.description = new JSContainer("description", "p");
                this.img = new JSContainer("img", "img");
                this.parameters = new com.spoonconsulting.lightning.LayoutItem("parameters", "div");
                this.status = new com.spoonconsulting.lightning.Badge("status");
                this.addChild(this.card);
                this.setSize(4);
                this.setSmallDeviceSize(12);
                this.setLargeDeviceSize(3);
                this.setMediumDeviceSize(4);
                this.card.getActions().addChild(this.status);
                const layout = new com.spoonconsulting.lightning.Layout("div", "div");
                layout.setMultipleRows(true);
                const left = new com.spoonconsulting.lightning.LayoutItem("left", "div");
                left.setSize(3);
                left.setSmallDeviceSize(12);
                left.setMediumDeviceSize(3);
                left.setLargeDeviceSize(3);
                left.setPadding(com.spoonconsulting.lightning.enums.LayoutItemPadding.AROUND_SMALL);
                layout.addChild(left);
                const right = new com.spoonconsulting.lightning.LayoutItem("right", "div");
                right.setSize(9);
                right.setSmallDeviceSize(12);
                right.setMediumDeviceSize(9);
                right.setMediumDeviceSize(9);
                layout.addChild(right);
                this.parameters.setSize(12);
                layout.addChild(this.parameters);
                left.addChild(this.img);
                right.addChild(this.description);
                this.card.getBody().addChild(layout);
                this.img.setStyle("width", "auto");
                this.parameters.addClass("slds-grid slds-wrap");
                this.addEventListener(new UIDevice.UIDevice$0(this), "change");
                iot.WIkIOTApi.getInstance$().addOnDeviceUpdateListener((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (device) => (funcInst['onUpdate'] ? funcInst['onUpdate'] : funcInst).call(funcInst, device); })(this)));
                iot.WIkIOTApi.getInstance$().subscribe(mac);
            }
            setDevice(device) {
                if (this.card.getTitle() !== device.device.name) {
                    this.card.setTitle(device.device.name);
                }
                if (this.name.getHtml() !== device.device.name) {
                    this.name.setHtml(device.device.name);
                }
                if (this.status.getLabel() !== device.device.status) {
                    this.status.setLabel(device.device.status);
                }
                if (this.description.getHtml() !== device.device.description) {
                    this.description.setHtml(device.device.description);
                }
                if (this.img.getAttribute("src") !== "https://m.media-amazon.com/images/I/71vRKosm7yL.jpg") {
                    this.img.setAttribute("src", "https://m.media-amazon.com/images/I/71vRKosm7yL.jpg");
                }
                if (this.parameters.getChildren().length === 0 || this.parameters.getChildren().length !== device.parameters.length) {
                    this.parameters.clearChildren();
                    this.parameters.setRendered(false);
                    for (let index325 = 0; index325 < device.parameters.length; index325++) {
                        let param = device.parameters[index325];
                        {
                            const ui = new iot.ui.UIParameter(param.name);
                            ui.setParameter(param);
                            this.parameters.addChild(ui);
                        }
                    }
                }
                else {
                    for (let index326 = 0; index326 < device.parameters.length; index326++) {
                        let param = device.parameters[index326];
                        {
                            const ui = this.parameters.getChild(param.name);
                            ui.setParameter(param);
                        }
                    }
                }
            }
            /**
             *
             * @param {iot.DeviceWrapper} device
             */
            onUpdate(device) {
                this.setDevice(device);
                this.fireListener("change", new CustomEvent("change"));
            }
        }
        ui_1.UIDevice = UIDevice;
        UIDevice["__class"] = "iot.ui.UIDevice";
        UIDevice["__interfaces"] = ["framework.components.api.Renderable", "iot.OnDeviceUpdate"];
        (function (UIDevice) {
            class UIDevice$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    this.__parent.render();
                }
            }
            UIDevice.UIDevice$0 = UIDevice$0;
            UIDevice$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(UIDevice = ui_1.UIDevice || (ui_1.UIDevice = {}));
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui_2) {
        class UIDevices extends com.spoonconsulting.lightning.Layout {
            constructor() {
                super("UIDevices", "div");
                this.setMultipleRows(true);
            }
            addDevice(mac) {
                const ui = new iot.ui.UIDevice(mac);
                this.addChild(ui);
            }
        }
        ui_2.UIDevices = UIDevices;
        UIDevices["__class"] = "iot.ui.UIDevices";
        UIDevices["__interfaces"] = ["framework.components.api.Renderable"];
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    var ui;
    (function (ui) {
        class UIParameter extends com.spoonconsulting.lightning.LayoutItem {
            constructor(name) {
                super(name, "div");
                if (this.parameter === undefined) {
                    this.parameter = null;
                }
                this.description = new JSContainer("p");
                this.tile = new com.spoonconsulting.lightning.Card("tile", "div");
                this.toggle = new com.spoonconsulting.lightning.Toggle(this.getName());
                this.addChild(this.tile);
                this.setSize(12);
                this.tile.getBody().addChild(this.description);
                this.tile.getActions().addChild(this.toggle);
                this.tile.getBody().setStyle("margin-top", "0").setStyle("margin-bottom", "0");
                this.description.setStyle("margin", "-0.6rem 0.2rem 0 1.5rem");
                this.toggle.getChild("checkbox").addEventListener(new UIParameter.UIParameter$0(this), "change");
            }
            setParameter(param) {
                this.parameter = param;
                if (this.tile.getTitle() !== param.name) {
                    this.tile.setTitle(param.name);
                }
                if (this.description.getHtml() !== param.description) {
                    this.description.setHtml(param.description);
                }
                const val = param.currentValue;
                const togg = this.toggle.getValue();
                if (val === "1" && !togg) {
                    this.toggle.setValue(true);
                }
                else if (val === "0" && togg) {
                    this.toggle.setValue(false);
                }
            }
        }
        ui.UIParameter = UIParameter;
        UIParameter["__class"] = "iot.ui.UIParameter";
        UIParameter["__interfaces"] = ["framework.components.api.Renderable"];
        (function (UIParameter) {
            class UIParameter$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const currentValue = this.__parent.toggle.getValue() ? "1" : "0";
                    const mac = this.__parent.parameter.mac;
                    const actionName = this.__parent.parameter.actionName;
                    iot.WIkIOTApi.getInstance$().addInstruction(mac, actionName, currentValue);
                }
            }
            UIParameter.UIParameter$0 = UIParameter$0;
            UIParameter$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(UIParameter = ui.UIParameter || (ui.UIParameter = {}));
    })(ui = iot.ui || (iot.ui = {}));
})(iot || (iot = {}));
(function (iot) {
    class WebSocketHandler {
        constructor() {
            this.deffered = (new Array());
            this.actionListeners = new Object();
            this.deviceUpdateListeners = (new Array());
            this.deviceConnectedListeners = (new Array());
            this.deviceInstructionListeners = (new Array());
            this.addActionListener(iot.ActionListener.GET_DEVICE, (((funcInst) => { if (typeof funcInst == 'function') {
                return funcInst;
            } return (action, message) => (funcInst['doExecute'] ? funcInst['doExecute'] : funcInst).call(funcInst, action, message); })(this)));
            this.addActionListener(iot.ActionListener.ADD_INSTRUCTION, (((funcInst) => { if (typeof funcInst == 'function') {
                return funcInst;
            } return (action, message) => (funcInst['doExecute'] ? funcInst['doExecute'] : funcInst).call(funcInst, action, message); })(this)));
            this.addActionListener(iot.ActionListener.START, (((funcInst) => { if (typeof funcInst == 'function') {
                return funcInst;
            } return (action, message) => (funcInst['doExecute'] ? funcInst['doExecute'] : funcInst).call(funcInst, action, message); })(this)));
        }
        connect(url) {
            if (WebSocketHandler.socket == null)
                WebSocketHandler.socket = new WebSocket(url);
            WebSocketHandler.socket.onclose = (e) => {
                this.onClose(e);
                return e;
            };
            WebSocketHandler.socket.onerror = (e) => {
                this.onError(e);
                return e;
            };
            WebSocketHandler.socket.onmessage = (e) => {
                this.onMessage(e);
                return e;
            };
            WebSocketHandler.socket.onopen = (e) => {
                this.onOpen(e);
                return e;
            };
        }
        addActionListener(action, listener) {
            if (this.actionListeners.hasOwnProperty(action)) {
                const listeners = this.actionListeners[action];
                listeners.push(listener);
                this.actionListeners[action] = listeners;
            }
            else {
                const listeners = (new Array());
                listeners.push(listener);
                this.actionListeners[action] = listeners;
            }
        }
        clearListeners$java_lang_String(action) {
            delete this.actionListeners[action];
        }
        clearListeners(action) {
            if (((typeof action === 'string') || action === null)) {
                return this.clearListeners$java_lang_String(action);
            }
            else if (action === undefined) {
                return this.clearListeners$();
            }
            else
                throw new Error('invalid overload');
        }
        clearListeners$() {
            this.actionListeners = new Object();
        }
        fireListeners(action, message) {
            if (this.actionListeners.hasOwnProperty(action)) {
                const listeners = this.actionListeners[action];
                for (let index327 = 0; index327 < listeners.length; index327++) {
                    let lis = listeners[index327];
                    {
                        lis(action, message);
                    }
                }
            }
        }
        addOnDeviceUpdateListener(listener) {
            this.deviceUpdateListeners.push(listener);
        }
        fireOnDeviceUpdate(device) {
            for (let index328 = 0; index328 < this.deviceUpdateListeners.length; index328++) {
                let lis = this.deviceUpdateListeners[index328];
                {
                    lis(device);
                }
            }
        }
        addOnDeviceConnectedListener(listener) {
            this.deviceConnectedListeners.push(listener);
        }
        fireOnDeviceConnected(mac) {
            for (let index329 = 0; index329 < this.deviceConnectedListeners.length; index329++) {
                let lis = this.deviceConnectedListeners[index329];
                {
                    lis(mac);
                }
            }
        }
        addOnDeviceInstructionListener(listener) {
            this.deviceInstructionListeners.push(listener);
        }
        fireOnDeviceInstruction(instruction) {
            for (let index330 = 0; index330 < this.deviceInstructionListeners.length; index330++) {
                let lis = this.deviceInstructionListeners[index330];
                {
                    lis(instruction);
                }
            }
            const ids = (new Array());
            ids.push(instruction.id);
            const ack = new iot.Acknowledge();
            ack.instructions = ids;
            ack.mac = instruction.mac;
            this.sendAcknowledgment(ack);
        }
        onClose(event) {
        }
        onError(event) {
        }
        onMessage(event) {
            const message = this.getMessageFromEvent(event);
            const action = message.headers["action"];
            if (action != null) {
                this.fireListeners(action, message);
            }
        }
        getMessageFromEvent(event) {
            const json = event.data;
            const data = JSON.parse(json);
            return data;
        }
        isConnecting() {
            return (WebSocketHandler.socket.readyState === WebSocketHandler.socket.CONNECTING);
        }
        isOpen() {
            return (WebSocketHandler.socket.readyState === WebSocketHandler.socket.OPEN);
        }
        onOpen(event) {
            if (this.deffered.length > 0) {
                for (let index331 = 0; index331 < this.deffered.length; index331++) {
                    let o = this.deffered[index331];
                    {
                        this.send(o);
                    }
                }
                this.deffered = (new Array());
            }
        }
        send(payload) {
            if (!payload.headers.hasOwnProperty("uid"))
                payload.headers["uid"] = this.getUID();
            if (!this.isOpen()) {
                this.deffered.push(payload);
            }
            else {
                WebSocketHandler.socket.send(JSON.stringify(payload));
            }
        }
        getUID() {
            const d = "" + Date.now() + Math.random();
            return d;
        }
        sendAcknowledgment(ack) {
            const ms = this.createMessage("acknowledge", ack);
            this.send(ms);
        }
        createMessage(action, payload) {
            const ms = new iot.SocketMessage();
            ms.headers["action"] = action;
            ms.body = JSON.stringify(payload);
            return ms;
        }
        /**
         *
         * @param {string} action
         * @param {iot.SocketMessage} message
         */
        doExecute(action, message) {
            if (action === iot.ActionListener.GET_DEVICE) {
                const device = JSON.parse(message.body);
                this.fireOnDeviceUpdate(device);
            }
            else if (action === iot.ActionListener.ADD_INSTRUCTION) {
                const instruction = JSON.parse(message.body);
                this.fireOnDeviceInstruction(instruction);
            }
            else if (action === iot.ActionListener.START) {
                this.fireOnDeviceConnected(message.body);
            }
        }
    }
    WebSocketHandler.socket = null;
    iot.WebSocketHandler = WebSocketHandler;
    WebSocketHandler["__class"] = "iot.WebSocketHandler";
    WebSocketHandler["__interfaces"] = ["iot.ActionListener"];
})(iot || (iot = {}));
(function (iot) {
    var simulation;
    (function (simulation) {
        class WIkiotDeviceAPI extends iot.WebSocketHandler {
            constructor(server) {
                super();
                this.executors = (new Array());
                this.addOnDeviceConnectedListener((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (mac) => (funcInst['onConnected'] ? funcInst['onConnected'] : funcInst).call(funcInst, mac); })(this)));
                this.addOnDeviceInstructionListener((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (instruction) => (funcInst['onInstruction'] ? funcInst['onInstruction'] : funcInst).call(funcInst, instruction); })(this)));
                this.addOnDeviceUpdateListener((((funcInst) => { if (typeof funcInst == 'function') {
                    return funcInst;
                } return (device) => (funcInst['onUpdate'] ? funcInst['onUpdate'] : funcInst).call(funcInst, device); })(this)));
                this.connect(server);
            }
            static INSTANCES_$LI$() { if (WIkiotDeviceAPI.INSTANCES == null) {
                WIkiotDeviceAPI.INSTANCES = new Object();
            } return WIkiotDeviceAPI.INSTANCES; }
            static getInstance$java_lang_String(server) {
                if (WIkiotDeviceAPI.INSTANCES_$LI$().hasOwnProperty(server)) {
                    return WIkiotDeviceAPI.INSTANCES_$LI$()[server];
                }
                else {
                    const instance = new WIkiotDeviceAPI(server);
                    WIkiotDeviceAPI.INSTANCES_$LI$()[server] = instance;
                    return instance;
                }
            }
            static getInstance(server) {
                if (((typeof server === 'string') || server === null)) {
                    return iot.simulation.WIkiotDeviceAPI.getInstance$java_lang_String(server);
                }
                else if (server === undefined) {
                    return iot.simulation.WIkiotDeviceAPI.getInstance$();
                }
                else
                    throw new Error('invalid overload');
            }
            static getInstance$() {
                if (Object.keys(WIkiotDeviceAPI.INSTANCES_$LI$()).length > 0) {
                    const ser = Object.keys(WIkiotDeviceAPI.INSTANCES_$LI$())[0];
                    return WIkiotDeviceAPI.getInstance$java_lang_String(ser);
                }
                else {
                    throw Object.defineProperty(new Error("Wikiot API not intialized yet. Please call the getInstance method by specifying the server at least once"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
            }
            start(device) {
                const ms = this.createMessage("start", device);
                this.send(ms);
            }
            addExecutor(execu) {
                this.executors.push(execu);
            }
            clearExecutors() {
                this.executors = (new Array());
            }
            fireExecutors(instruction) {
                let param = null;
                for (let index332 = 0; index332 < this.executors.length; index332++) {
                    let exec = this.executors[index332];
                    {
                        param = exec(instruction, param);
                    }
                }
                return param;
            }
            /**
             *
             * @param {iot.DeviceWrapper} device
             */
            onUpdate(device) {
            }
            /**
             *
             * @param {iot.Instruction} instruction
             */
            onInstruction(instruction) {
                this.fireExecutors(instruction);
            }
            /**
             *
             * @param {string} mac
             */
            onConnected(mac) {
            }
        }
        simulation.WIkiotDeviceAPI = WIkiotDeviceAPI;
        WIkiotDeviceAPI["__class"] = "iot.simulation.WIkiotDeviceAPI";
        WIkiotDeviceAPI["__interfaces"] = ["iot.OnDeviceConnected", "iot.OnDeviceUpdate", "iot.ActionListener", "iot.OnDeviceInstruction"];
    })(simulation = iot.simulation || (iot.simulation = {}));
})(iot || (iot = {}));
(function (iot) {
    class WIkIOTApi extends iot.WebSocketHandler {
        constructor(server) {
            super();
            this.connect(server);
        }
        static INSTANCES_$LI$() { if (WIkIOTApi.INSTANCES == null) {
            WIkIOTApi.INSTANCES = new Object();
        } return WIkIOTApi.INSTANCES; }
        static getInstance$java_lang_String(server) {
            if (WIkIOTApi.INSTANCES_$LI$().hasOwnProperty(server)) {
                return WIkIOTApi.INSTANCES_$LI$()[server];
            }
            else {
                const instance = new WIkIOTApi(server);
                WIkIOTApi.INSTANCES_$LI$()[server] = instance;
                return instance;
            }
        }
        static getInstance(server) {
            if (((typeof server === 'string') || server === null)) {
                return iot.WIkIOTApi.getInstance$java_lang_String(server);
            }
            else if (server === undefined) {
                return iot.WIkIOTApi.getInstance$();
            }
            else
                throw new Error('invalid overload');
        }
        static getInstance$() {
            if (Object.keys(WIkIOTApi.INSTANCES_$LI$()).length > 0) {
                const ser = Object.keys(WIkIOTApi.INSTANCES_$LI$())[0];
                return WIkIOTApi.getInstance$java_lang_String(ser);
            }
            else {
                throw Object.defineProperty(new Error("Wikiot API not intialized yet. Please call the getInstance method by specifying the server at least once"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
        }
        /**
         *
         * @param {CloseEvent} event
         */
        onClose(event) {
            super.onClose(event);
        }
        /**
         *
         * @param {Event} event
         */
        onError(event) {
            super.onError(event);
        }
        /**
         *
         * @param {MessageEvent} event
         */
        onMessage(event) {
            super.onMessage(event);
        }
        /**
         *
         * @param {Event} event
         */
        onOpen(event) {
            super.onOpen(event);
        }
        send(message) {
            super.send(message);
        }
        subscribe(mac) {
            const message = new iot.SocketMessage();
            message.headers["action"] = "get-device";
            message.body = mac;
            this.send(message);
        }
        addInstruction(mac, name, value) {
            const instruction = new iot.Instruction();
            instruction.actionName = name;
            instruction.parameterName = name;
            instruction.parameterValue = value;
            instruction.mac = mac;
            const message = new iot.SocketMessage();
            message.headers["action"] = "add-instruction";
            message.body = JSON.stringify(instruction);
            this.send(message);
        }
    }
    iot.WIkIOTApi = WIkIOTApi;
    WIkIOTApi["__class"] = "iot.WIkIOTApi";
    WIkIOTApi["__interfaces"] = ["iot.ActionListener"];
})(iot || (iot = {}));
iot.WIkIOTApi.INSTANCES_$LI$();
iot.simulation.WIkiotDeviceAPI.INSTANCES_$LI$();
iot.Main.main(null);
