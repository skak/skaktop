// SMS Chrome
this.manifest = {
    "name": "SMS Chrome",
    "icon": "../../icon48.png",
    "settings": [
        {
            "tab": i18n.get("general"),
            "group": i18n.get("sms_options"),
            "name": "country",
            "type": "popupButton",
            "label": i18n.get("country"),
            "options": [
                ["Deutschland"],
                ["United Kingdom"],
                ["Italy"],
                ["Polska"]
            ]
        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("sms_options"),
            "name": "countryDescription",
            "type": "description",
            "text": i18n.get("countryDescription")
        }
    ]
};
