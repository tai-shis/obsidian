/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SpellcheckTogglerPlugin
});
module.exports = __toCommonJS(main_exports);

// src/plugin.ts
var import_obsidian2 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var SpellcheckBehaviourOptionDisplay = {
  ["default" /* DEFAULT */]: "Always spellcheck",
  ["opt-in" /* OPT_IN */]: "Opt-in disable",
  ["opt-out" /* OPT_OUT */]: "Opt-out disable",
  ["global" /* GLOBAL */]: "Never spellcheck"
};
var defaultSettings = {
  externalLinks: { behaviour: "global" /* GLOBAL */ },
  internalLinks: { behaviour: "global" /* GLOBAL */ },
  htmlComments: { behaviour: "default" /* DEFAULT */ },
  anyNode: { behaviour: "default" /* DEFAULT */ }
};
var SpellcheckTogglerSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    let { containerEl } = this;
    containerEl.empty();
    const createSpellcheckOptionDisplay = (optionsKey, name, description, targetFormat) => {
      const settingContainer = containerEl.createDiv({
        cls: "settings-container"
      });
      const headingSetting = new import_obsidian.Setting(settingContainer).setHeading().setName(name).setDesc(description);
      if (targetFormat) {
        const span = headingSetting.controlEl.createEl("span", {
          text: `Targeted format: `,
          cls: "setting-item-target-label"
        });
        span.createEl("code", {
          text: targetFormat,
          cls: "setting-item-target-label"
        });
      }
      const behaviourDropdownSetting = new import_obsidian.Setting(
        settingContainer
      ).setDesc("Spellchecking behaviour");
      const frontmatterOverrideTextSetting = new import_obsidian.Setting(settingContainer).setDesc("Frontmatter override property").setTooltip(
        "Define the (boolean) frontmatter property which controls the spellcheck behaviour for the respective file."
      ).addText(
        (text) => {
          var _a;
          return text.setValue(
            (_a = this.plugin.settings[optionsKey].frontmatterOverride) != null ? _a : ""
          ).onChange(
            (frontmatterOverride) => this.plugin.saveSettings({
              [optionsKey]: {
                ...this.plugin.settings[optionsKey],
                frontmatterOverride: frontmatterOverride.length ? frontmatterOverride : void 0
              }
            })
          );
        }
      );
      frontmatterOverrideTextSetting.settingEl.toggleClass(
        "hidden",
        [
          "default" /* DEFAULT */,
          "global" /* GLOBAL */
        ].includes(this.plugin.settings[optionsKey].behaviour)
      );
      behaviourDropdownSetting.addDropdown((dropdown) => {
        dropdown.addOptions(SpellcheckBehaviourOptionDisplay);
        dropdown.onChange((behaviour) => {
          this.plugin.saveSettings({
            [optionsKey]: {
              ...this.plugin.settings[optionsKey],
              behaviour
            }
          });
          frontmatterOverrideTextSetting.settingEl.toggleClass(
            "hidden",
            [
              "default" /* DEFAULT */,
              "global" /* GLOBAL */
            ].includes(this.plugin.settings[optionsKey].behaviour)
          );
        });
        dropdown.setValue(this.plugin.settings[optionsKey].behaviour);
      });
    };
    const legendContainer = containerEl.createDiv({
      cls: "settings-container"
    });
    new import_obsidian.Setting(legendContainer).setHeading().setName("Spellcheck toggler settings").setDesc(
      "Configure spellchecking options. The behaviour of a spellcheck option is defined as follows:"
    );
    const list = legendContainer.createEl("ul");
    list.createEl("li", {
      text: `     "Always spellcheck": the editor default behaviour will be applied (the plugin is not active for the option).`,
      cls: "setting-item-target-label"
    });
    list.createEl("li", {
      text: `     "Opt-in disable": explicitly use the defined frontmatter override property to disable spellchecking in applicable files, otherwise in files without the property apply the editor default (spellcheck) for the option.`,
      cls: "setting-item-target-label"
    });
    list.createEl("li", {
      text: `     "Opt-out disable": explicitly use the defined frontmatter override property to enable spellchecking in applicable files, otherwise in files without the property do not spellcheck the option.`,
      cls: "setting-item-target-label"
    });
    list.createEl("li", {
      text: `     "Never spellcheck": do not use spellcheck in any file for the option.`,
      cls: "setting-item-target-label"
    });
    createSpellcheckOptionDisplay(
      "externalLinks",
      "External links option",
      "Toggle spellcheck underline for link text in any external link.",
      "![text](link)"
    );
    createSpellcheckOptionDisplay(
      "internalLinks",
      "Internal links option",
      "Toggle spellcheck underline for link text in any internal link.",
      "[[ link text ]]"
    );
    createSpellcheckOptionDisplay(
      "htmlComments",
      "Html comment option",
      "Toggle spellcheck underline for any text inside an html comment block.",
      "<-- text -->"
    );
    createSpellcheckOptionDisplay(
      "anyNode",
      "Any text node option",
      'Toggle spellcheck for any text node type. Recommended use with "Opt-in disable" behaviour to target specifc files. With the "Never spellcheck" behaviour, this option will disable spellcheck for all text in every file.',
      "*"
    );
  }
};

// src/spellchecks/html-comments.ts
var import_view2 = require("@codemirror/view");

// src/spellchecks/apply-spellcheck-plugin.ts
var import_view = require("@codemirror/view");
var import_state = require("@codemirror/state");
var import_language = require("@codemirror/language");

// src/context.ts
var spellcheckContext = {
  file: null,
  frontmatter: null,
  settings: defaultSettings
};
var updateSpellcheckContext = (partialContext) => {
  spellcheckContext = { ...spellcheckContext, ...partialContext };
};
var getSpellcheckContextProperty = (key) => spellcheckContext[key];

// src/spellchecks/apply-spellcheck-plugin.ts
var ApplySpellcheckAttributePluginValue = class {
  constructor(view) {
    this.decorations = this.buildDecorations(view);
  }
  update(update) {
    if (!update.docChanged && !update.viewportChanged)
      return;
    this.decorations = this.buildDecorations(update.view);
  }
  buildDecorations(view) {
    const builder = new import_state.RangeSetBuilder();
    const markSpellcheckFalse = import_view.Decoration.mark({
      attributes: { spellcheck: "false" }
    });
    const enter = (node) => {
      var _a;
      if ((_a = this.isNodeEligible) == null ? void 0 : _a.call(this, node))
        builder.add(node.from, node.to, markSpellcheckFalse);
    };
    for (let { from, to } of view.visibleRanges)
      (0, import_language.syntaxTree)(view.state).iterate({
        from,
        to,
        enter
      });
    return builder.finish();
  }
};
var checkNodeEligibility = (settingsKey) => {
  const frontmatter = getSpellcheckContextProperty("frontmatter");
  const override = getSpellcheckContextProperty("settings")[settingsKey].frontmatterOverride;
  const isOverrideInFrontmatter = frontmatter !== null && override !== void 0 && override in frontmatter;
  switch (getSpellcheckContextProperty("settings")[settingsKey].behaviour) {
    case "global" /* GLOBAL */:
      return true;
    case "opt-in" /* OPT_IN */:
      return isOverrideInFrontmatter && frontmatter[override] === false;
    case "opt-out" /* OPT_OUT */:
      return !isOverrideInFrontmatter || frontmatter[override] === false;
  }
  return false;
};

// src/spellchecks/html-comments.ts
var HtmlCommentSpellcheckPluginValue = class extends ApplySpellcheckAttributePluginValue {
  isNodeEligible(node) {
    if (!node.type.name.startsWith("comment"))
      return false;
    return checkNodeEligibility("htmlComments");
  }
};
var htmlCommentSpellcheckPluginValue = import_view2.ViewPlugin.fromClass(
  HtmlCommentSpellcheckPluginValue,
  {
    decorations: (pluginValue) => pluginValue.decorations
  }
);

// src/spellchecks/external-links.ts
var import_view3 = require("@codemirror/view");
var ExternalLinkSpellcheckPluginValue = class extends ApplySpellcheckAttributePluginValue {
  isNodeEligible(node) {
    if (!node.type.name.startsWith("link"))
      return false;
    return checkNodeEligibility("externalLinks");
  }
};
var externalLinkSpellcheckViewPlugin = import_view3.ViewPlugin.fromClass(
  ExternalLinkSpellcheckPluginValue,
  {
    decorations: (pluginValue) => pluginValue.decorations
  }
);

// src/spellchecks/internal-links.ts
var import_view4 = require("@codemirror/view");
var InternalLinkSpellcheckPluginValue = class extends ApplySpellcheckAttributePluginValue {
  isNodeEligible(node) {
    if (!node.type.name.startsWith("hmd-internal-link"))
      return false;
    return checkNodeEligibility("internalLinks");
  }
};
var internalLinkSpellcheckViewPlugin = import_view4.ViewPlugin.fromClass(
  InternalLinkSpellcheckPluginValue,
  {
    decorations: (pluginValue) => pluginValue.decorations
  }
);

// src/migration/index.ts
var validateAndMigrateSettings = (settings) => {
  const migratedOutput = {};
  if (settings === null)
    return {};
  const keys1_1_0ToKeys1_2_0 = {
    spellcheckExternalLinks: "externalLinks",
    spellcheckInternalLinks: "internalLinks",
    spellcheckHtmlComments: "htmlComments"
  };
  for (const [srcKey, destKey] of Object.entries(keys1_1_0ToKeys1_2_0)) {
    if (srcKey in settings && typeof settings[srcKey] === "boolean") {
      migratedOutput[destKey] = {
        behaviour: settings[srcKey] ? "default" /* DEFAULT */ : "global" /* GLOBAL */
      };
      delete settings[srcKey];
    }
  }
  return { ...migratedOutput, ...settings };
};

// src/spellchecks/any-node.ts
var import_view5 = require("@codemirror/view");
var AnyNodeSpellcheckPluginValue = class extends ApplySpellcheckAttributePluginValue {
  isNodeEligible(node) {
    return checkNodeEligibility("anyNode");
  }
};
var anyNodeSpellcheckPluginValue = import_view5.ViewPlugin.fromClass(
  AnyNodeSpellcheckPluginValue,
  {
    decorations: (pluginValue) => pluginValue.decorations
  }
);

// src/plugin.ts
var SpellcheckTogglerPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.editorExtensions = [];
  }
  async loadSettings() {
    const userSettings = validateAndMigrateSettings(await this.loadData());
    this.settings = { ...defaultSettings, ...userSettings };
    this.saveData(this.settings);
    updateSpellcheckContext({ settings: this.settings });
  }
  async saveSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    await this.saveData(this.settings);
    this.refreshExtensions();
    updateSpellcheckContext({ settings: this.settings });
  }
  buildExtensions() {
    this.editorExtensions.length = 0;
    if (this.settings.internalLinks.behaviour !== "default" /* DEFAULT */)
      this.editorExtensions.push(internalLinkSpellcheckViewPlugin);
    if (this.settings.externalLinks.behaviour !== "default" /* DEFAULT */)
      this.editorExtensions.push(externalLinkSpellcheckViewPlugin);
    if (this.settings.htmlComments.behaviour !== "default" /* DEFAULT */)
      this.editorExtensions.push(htmlCommentSpellcheckPluginValue);
    if (this.settings.anyNode.behaviour !== "default" /* DEFAULT */)
      this.editorExtensions.push(anyNodeSpellcheckPluginValue);
  }
  refreshExtensions() {
    var _a, _b;
    this.buildExtensions();
    this.app.workspace.updateOptions();
    (_b = (_a = this.app.workspace.activeEditor) == null ? void 0 : _a.editor) == null ? void 0 : _b.refresh();
  }
  onFileOpen(file) {
    var _a, _b;
    if (file === null)
      return;
    updateSpellcheckContext({
      file,
      frontmatter: (_b = (_a = this.app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter) != null ? _b : null
    });
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SpellcheckTogglerSettingTab(this.app, this));
    this.buildExtensions();
    this.registerEditorExtension(this.editorExtensions);
    this.onFileOpen(this.app.workspace.getActiveFile());
    this.onFileOpenEventRef = this.app.workspace.on(
      "file-open",
      this.onFileOpen.bind(this)
    );
  }
  unload() {
    this.app.workspace.offref(this.onFileOpenEventRef);
    super.unload();
  }
};

/* nosourcemap */