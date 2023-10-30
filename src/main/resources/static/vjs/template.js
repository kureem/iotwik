/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
class DoTTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    compile(html, ctx) {
        let rendered = html;
        const doT = window["doT"];
        if (doT != null) {
            const templ = HTMLTemplateContainer.invokeFunction(doT, "template", html);
            rendered = templ.call(templ, ctx);
        }
        return rendered;
    }
}
DoTTemplateContainer["__class"] = "framework.components.templates.DoTTemplateContainer";
DoTTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
class EJSTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    compile(html, ctx) {
        let rendered = html;
        const ejs = window["ejs"];
        if (ejs != null) {
            rendered = HTMLTemplateContainer.invokeFunction(ejs, "render", html, ctx);
        }
        return rendered;
    }
}
EJSTemplateContainer["__class"] = "framework.components.templates.EJSTemplateContainer";
EJSTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
class JSRenderTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    compile(html, ctx) {
        let rendered = html;
        const jsrender = window["jsrender"];
        if (jsrender != null) {
            const templ = HTMLTemplateContainer.invokeFunction(jsrender, "templates", html);
            rendered = HTMLTemplateContainer.invokeFunction(templ, "render", ctx);
        }
        return rendered;
    }
}
JSRenderTemplateContainer["__class"] = "framework.components.templates.JSRenderTemplateContainer";
JSRenderTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
class MustacheTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    compile(html, ctx) {
        let rendered = html;
        const mustache = window["Mustache"];
        if (mustache != null) {
            rendered = HTMLTemplateContainer.invokeFunction(mustache, "render", html, ctx);
        }
        return rendered;
    }
}
MustacheTemplateContainer["__class"] = "framework.components.templates.MustacheTemplateContainer";
MustacheTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
class NunjucksTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    /**
     *
     * @param {string} html
     * @param {Object} ctx
     * @return {string}
     */
    compile(html, ctx) {
        let rendered = html;
        const nunjucks = window["nunjucks"];
        if (nunjucks != null) {
            rendered = HTMLTemplateContainer.invokeFunction(nunjucks, "renderString", html, ctx);
        }
        return rendered;
    }
}
NunjucksTemplateContainer["__class"] = "framework.components.templates.NunjucksTemplateContainer";
NunjucksTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
class SqrlTemplateContainer extends HTMLTemplateContainer {
    constructor(name, template) {
        super(name, template);
    }
    compile(html, ctx) {
        let rendered = html;
        const Sqrl = window["Sqrl"];
        if (Sqrl != null) {
            rendered = HTMLTemplateContainer.invokeFunction(Sqrl, "render", html, ctx);
        }
        return rendered;
    }
}
SqrlTemplateContainer["__class"] = "framework.components.templates.SqrlTemplateContainer";
SqrlTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
