$(document).ready(function()
{
    var EXT_ICON_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAB/GAAAfxgBwnaBpAAAAAd0SU1FB9wDDg8ABuxomR8AAARFSURBVEjHjZVNbFVFFMd/Z2bufaWvH1LaAgWLxNBYVNSYJsZdQ/xIN7hhY6LGGF0YjRuCJCTGmEBKUlauXLlxowkLkkrEgEZFF24EoUhUhH698tG+An19ffdrjgv6nvT1w55kkpkzd85vzj3/c6/wgJ09e7bVWvuec+4Na+1Oa601xoi1Fmstxhiq8/o1UBCRr4Chrq6uyWpMqU5Onz7d4r0/Y63tU9Ulh+sD1w211uKck8VnC8aY/q6urj8BXBVQLpffUdU+Ywy9vb20tbVhjLl/C5HaAOr9ApAkCcViEaDLWvsp8NISwOjo6FvNzc309fXR3d1NkkakmtxPUQQrDmdCRCD1kPhFAOCs0BgEOOcYGxtT59yL1bg1wPj4+K4oiujv72d+YY6L02coJdOIGEQM+eAhnup8gQaX57tCxq2KEhghMNCWE57fbAmsJcsySdOUZQBjjNX7JnOVWX4ZO0Hsy3Q2PUJ7/mGipExxYZKWXA+Xip7QQmAUK8KdCJ7epDRbTxRFeO+XA+qLnvmEcnyPa8XzjM5epD2/nZ6252gMlFKSkcsEa4TAKAhkmcGLJ45jsiyrBTSsaLo4wIhFVbk5d52Z0hSlSsKvUzHX7qWUEqWcKqVYSb1HValUKlQqlVUzACBn8zSH7cxWbtRyEoVtTY/R2eC5XU75o5jS4GJ2NFue6QwIDKgqURSxYg2WAhrZ3/sxY3MjqHqUjG1NvbQGHcQ+5duBDfww5Wu59rQojcSkqVIul1HVtQEqsKFY5olriwu1ZJ13SHs6IbXksgn2bfx5sWRC7HYRZU8SRRFXrlypdvbqAOZLhJ9/hvzzd60kJnDohx+Rde+k5ebLSDZbezywG0k3fw10EMcxpVJp7SJLFCG3byJpimQZ4jOkUkEmJ7FawKQ3EFKEFDTBJAXEz69411VUtESxD7hkZf8aZpbHkAekWl8cXfRqbVdYm+nqxC/eezTfhH+0B3P54n+7YUi2+3HUbCHN9WGTv/AYEMUHO/C2DVGpxVkJMC0iHcVikS1bt6LvfgA3Cogqqop2bibY0EgSlbm75RQuuYRzDhGDd9sJ3SZujY8xPz+/agbfhGH42smTJ/XcuXOiujz1jvZ29u7dSy6XY4Fefvr+R2ZmZvD+N6IoYmZmRlVVrLW/LwOEYfhJFEX7FhYWWiYmJlZ8n4XJSfbs2UNHRwfDw8M6MjIiVc1X/w0icjcIgtdXlMqhQ4eeTdN0v6rmVbX6SVRjTIOqvm2MMQMDA1y4cEGvXr0qYRhijPlCVSMRSYHJIAhOHD169PIaWoQjR47I9PQ0xhiOHz+uQ0NDG6empm4DNggC4jhGRLxz7tXW1tYTSZJoPp/XAwcO+LVUVLPDhw8v0agxprrWOI5FRMrOufePHTv25f/1gVtPszjnVFXtImzaOffm4ODg8HrOrrstDx48eEpVd1trXxkcHDy/3nP/Ak+/5hWUi158AAAAAElFTkSuQmCC';
    var DDG_FAVICON_URL = 'data:image/vnd.microsoft.icon;base64,AAABAAMAEBAAAAEACABoBQAANgAAACAgAAABAAgAqAgAAJ4FAAAwMAAAAQAIAKgOAABGDgAAKAAAABAAAAAgAAAAAQAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUvgAAFMAAABfDAAAYwQAAGscAAB7KAAAgzAAAIcwAACHNAAAizgAAI9AAACTQAAAnzAAAJtMAACnXABktyAAALtgAAC/bAAAx3QAAM+AAADbjAAA34wAAOOQAADzYAAA65wAWPdcAADvoAABG1QC6cg0AAFXdAERS0AAAVd8AAF3cAABp5wAAcOUATGziAAB36AAAeugATHLqAF165ABlg+0A0qRkAACS7wAAlO8AeI7nAIGX6gCVndwAAKX1AACr9gAAr/YAALX4AAC3+QCdrvIAALz6AAC9+QAAv/kAAMD7AADH+wAAyvwAAND9ALHB9QAA0vwA5c68AADT/gAA1P0AANT+AADU/wAA1/8AANj/AADZ/wAA3P8AAN3/AGrV+wAA3/8AAOH/AMrS9ADs3tYA39zmAOHj8AB+6v8A5ur6AKDw/wCq8f8A9fDtAPby7wD38vAA6/D8APfz8QD69O4A8PP8APL0/AD69/IA+/fzAPr39QDd+f8A+/n1APb4/QD7+fgA+/r5AOz8/gD1/P8A+vz/AP7+/QD//v8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpLGhoaGhQHgEAAQEBAQFpGUtoaGhoSw8CAwICAgICAiNQaGhoaC0EBAwgIBsEBAQnWmhoaGgnIjY5PUBHOyUFLWhoaGheR0MdBgYGByQrCEtoaGhoT0I3CQkJCQkJCQlQaGhoaFI/QTIzNSoXCgsLWmhoaGhoUUVEQ0RKRDEfDWhoXFxoaGhjZWRILzpJRjhoXBwcWGhoaFtbYg4QIS8waFwcKVhoaF8cHF8REREREWhnXFxoaGhfHClOEhISEhJVU2hoaGhoaF9fNBMTExMTVz5MZmhoaFdMTSYUFBQUFDxhVGhoaGhdPi4VFhYWFhZpVmBoaGhoWSgYGhoaGhppgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAACgAAAAgAAAAQAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFL8AABTAAAEWvAABF74AABbCAAAXwwABGMAAABjDAAAYxAAAGsUAABrGAAAbxgAAG8cAAh3BAAEcxQAAHMgAAR3HAAgewgAAHcoAAB/LAAAgzAAFIckAiEYiAAAhzgAAI88AACPQAAAk0AAAJc8AACXSAAUmzQAAJ9IAACfTABAqxwAAKNQAjE0rAAAp1QAAKdYAACrXAAAr2AAGLdMAAC3ZAAAu2wAAL9wAADPVAAAx3QAAMt8AADPgAAA04QAAONQAADnXAAA24wAGN94ACjfdAAA34wAAN+QACznbAAA45QAJOeAAFTzUABY81AAAOeYAFj3UAAo74AAAP9YAADrnAAs74AAAPtoABT/pAABF2wAARd0AAEbaAABI1gAASdoAEETmAABJ2wAAS98AAFHfAAFV3ABTc2EAWYA+AAFa4gAAXd0AAF3hADyeAAABZd4AAWTjADZf5wABZuIAQKETAD2jDwBGZ9gARKEYADhk6wA8pBMAPKUVAK+DbABKbN8ATGziAAF15ABTpioAaKE1AEGtJAABfOkAOrIiAH6hRQABgOkAAYLmAAGC5wACgucAXXrkAAGE5wBEr0AAAYToAAGG6gA9s0AAObkuAD20QQA5ui8AaIHhAEe3OABxgeAAAo3sAFasbABshukAOcA5AGmI7gABleoAbovsAAKZ7QCFtmEAAp7vAD7CagCBl+oAPsNuAAKo8QACqvIAA6zyAAOs9AACr/QAkKfxAGLJlQBfypUAZMqWAAO49QDSuawAc8qaAMPCngADwfgAA8H5AAPE+QAEyPsABMr7AATO/AAE0PwABND9AATR/QAE0v0ACNP9ABvW/QDj1MwAMtr9ADvc/QDK0vQA59rTAOjb1ADp3tcA6+DaAG/l/gB15v4A29/0AO3k3wDu5eAA4eT3AJDr/gDy6+cA5uj3APLs6ADj6PsA8+zpAObq+gDz7uoA8+7rANHt+gD07usA6e35APbx7wDy9PwA5fr/APv7+wD2+/8A7fz/APz8+gDw/P8A/fz7APv8/gD9/f4A+P7/AP/+/gD+/v8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMgAAAAAPYyDb4HHx8fHw05dUwAAAAAAAAAAAAAAyMjIAQEBAQFhkYNyXmV3Y2h6dF1TAgEBAQEBAQEBAQEByAQEBAQEBG2Og3JedXxnWYV0XVMDBAQEBAQEBAQEBAQEBQUFBQURhIyDcl5zfGdbhXRdUwYFBQUFBQUFBQUFBQUICAgICDuijYNyXmV3ZE96dF1TBwgICAgICAgICAgICAoKCgoKYbOMg5K/x8esCg5OWFMJCgoKCgoKCgoKCgoKDAwMDAxtusfHx8fHx3gMDAwLDQwMDAwMDAwMDAwMDAwPDw8PEITHx8fHx8fHFQ8PDw8PDw8PDw8PDw8PDw8PDxISEhIgosfHx8fHx8YSEhISEhISEhISEhISEhISEhISExMTEzuzx8fHx8fHrxMTExMTExMTExMTExMTExMTExMUFBQUYbrHx8fHx8epFBQUboiXnJqGVEcUFBQUFBQUFBcXFxdtx8fHx8fHx7YbbJyYj2tigpObnIAXFxcXFxcXGBgYHYTHx8fHx8e7npybcE0wGBgYP1F+ahgYGBgYGBgaGho6osfHx8fHx6icnIcZGhoaGhoaGhoaGhoaGhoaGhwcHGGzx8fHx8fHp5ycnEgeRjErHBwcHBwcHBwcHBwcISEhbbrHx8fHx8e+oZycnJycnJyViVdEISEhISEhISEhIR+Ex8fHx8fHx8fEraCdnJycnJycnJZxSiEhISEhISMjJ6LHx8fHx8fHx8fHx8fAvcBCVXmUnJyZUiMjIyMjJSU6s8fHx6Wlx8fHx8fHx8fHxyUkJUxpmZuKJSUlJSUmJmG6x8WjIhaqx8fHx8fHtLTHJiYmJkVQZksmJiYmJigobcXHx6QiX6rHx8fHx7AiFrUoKCgoKCgoKCgoKCgoKSmEx8fHx6urx8fHx8fHsiJfeykpKSkpKSkpKSkpKSkqKoTHt8fHx8fHx8fHx8fHubk0KioqKioqKioqKioqKiwsbcemx8fHx8fHx8fHwcfHuCwsLCwsLCwsLCwsLCwsLi43s8eQkJ/Hx8fHx8eukJA5Li4uLi4uLi4uLi4uLi4uLi2Ex8fHx8fHx8fHx8fHfy4uLi4uLi4uLi4uLi4uLi8vLzOzx8fHx8fHx8fHx4svLy8vLy8vLy8vLy8vLy8vMjIyMkGEvMfHx8fHx7FWMjIyMjIyMjIyMjIyMjIyMjI2NjY2MjI+drPHx8d9NTY2NjY2NjY2NjY2NjY2NjY2Njg4NlrHx8fHx8fGSTg4ODg4ODg4ODg4ODg4ODg4ODg4yEBAPGDHx8fCXEBAQEBAQEBAQEBAQEBAQEBAQEBAQMjIyENDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PIyMAAAAOAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAHAAAADKAAAADAAAABgAAAAAQAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwQAAE8IAABXEAAAXxQAAGcYAARvHAAAfwAAAHsoAFSucAIdGHgAAIs0Ai0kjAAAlzwAHJc8AID59AAAo0gCPTSgAACnTACQ8lwAYMsgAADDaAAI01AA+WkgAADTeABU4zgAEM+YAl1o3AAg52QAANukAADfqAAA65AA5Y0cAAEDYABc+3QAARtYANEPPAJ1lQgA6eSUAGUbeAAFK2wAVRucAMknWAAJQ2gA8hBkANoQfAB9M5QAXTeYANo0FAABT3gAmUeEAVoMvAEaYAAAAXeIASJIcAABg3gA9WeEAPZ4AADefBACneGMAA2TiAAFn3gAwX+oAU4ZkADqiDwAAauIArH9hAKx9aABWZtYAW4pfAFJp2gAAcOIAX2raAEOkJABJoi4AXKErAEtt4ABGpykANa0bAElu6gA6qiYAaXLbAAZ66ABFricAPq4tAFZ24wBseNoAeaVCALiPdwBtedsANrgeAF955gBBsjIAY6dMAFx86gBYfu0AAIjrAD61RwBCuzMAZILpAAKM6QCipWMAYrZCAL+bhwA3wjQAaIbuADy6UABrifEAAJXtAHCL6wBZtmgATLduAG2O8AACnO8APMFkAIuW4wCltXMAq7J+AIKX6AB9mOsAyamaAImb5AA5xXMAi6DjAACq9ACsuYgAT8iDAAaw8wBBzIIAjqbyAACz9wCVqu0AmK3xAJ+u8AClru4AC8P2AKa48wAAx/wAAMv5ALvQtgAJz/4AAND/ALPB9QDDzscAANP8AMDF7QAQ1PwAwsz3ACna/AC9zfoANtv8AObYzACr4sYA6NrOAMvS8wCu5M8ATuD/AGDi/wCy59MAaOP/ANPn1ABp5vwA5eHjAOzk2wDU3vgAwurYAIHq/ADr6t0Akev/AObm8wDh5vYA9e3kAOTq+gDz8OsAsPH/AOjt/QC38v8A6u//AN327QDx8f4A+PT2AM73/gDz9foA+/jzAPX2/AD8+fQA3fr8AP369QD4+v8A+v37AP/++AD8//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/vwAAAAAAAAAAAAAAAAF2obO9vr6+vr6+vr28RwAAAAAAAAAAAAAAAAAAAAAAv7+/AAYAAAAAAAAAAAABAgGZfW18vr6+vr6+vr6pAAAAAAAAAAAAAAAAAAAAAQAGAL8BAQEBQ5Cyvru+vb1QAxiff3FgSWS+vr6+vr5HAggWDgETvb67vr2+vrWQQwEGAQEBAQFyvlUTAAEBAQEAAUukfXFgTzhMYFJKc44+ST9IKwEBAQEBAQEBAQFVvnIBAQEBAUO+IwEBAQEAAQEBAVSdf3FgT0hnZ1lNSHlpWz85LwEBAQEBAQEBAQEBI7tDAQECApBYAgICAgICAgICAnWaf3FgUjhnZ2FPP31pUzhILwICAgICAgICAgICAliQAgICArUCAgICAgICAgICApmaf3FgTzlnZ1lNSHlpUzg5LwICAgICAgICAgICAgK1AgICAr0CAgICAgICAgICS6mXf3FgTzNWZVtPMm5pWz9ILAICAgICAgICAgICAgK7AgICAr4CAgICAgICAgICVLWXf3FcdL6+vr6FBAJEUzg4JQICAgICAgICAgICAgK9AgICArsCAgICAgICAgICdb6xiqa+vr6+vrMpCgICEjU4HwICAgICAgICAgICAgK7AgIDA74DAwMDAwMDAwMDmb6+vr6+vr6+vrAKAwMDAwMSAwMDAwMDAwMDAwMDAwO+AwMDA7sDAwMDAwMDAwMDqb6+vr6+vr6+voUDAwMDAwMDAwMDAwMDAwMDAwMDAwO9AwMFBb4FBQUFBQUFBQVLtb6+vr6+vr6+vkUFBQUFBQUFBQUFBQUFBQUFBQUFBQW+BQUFBbsFBQUFBQUFBQVavr6+vr6+vr6+vikFBQUFBQUFBQUFBQUFBQUFBQUFBQW9BQUHB7sHBwcHBwcHBwd1vr6+vr6+vr6+vgcHBwcHBwcHBwcHBwcHBwcHBwcHBwe+BwcHB70HBwcHBwcHBweZvr6+vr6+vr6+vgcHBwciUXuIj4+PhmsqBwcHBwcHBwe+BwcKCr4MCgoKCgoKCgqrvr6+vr6+vr6+vgoKY4uRj5GRkYyPi4uRiDYKCgoKCgq7CgoKCr4MCgoKCgoKCku1vr6+vr6+vr6+r4aPi4twOycgIjBAcIaLj488CgoKCgq9CgoKCr4KCgoKCgoKClS+vr6+vr6+vr60kYyMiyoKCgoKCgoKCgoVKkYVCgoKCgq9CgoMDLsMDAwMDAwMDHW+vr6+vr6+vrubjI+RYw0KCgoKCgoMCgwMDAwMDAwMCgy+CgwMDL4MDAwMDAwMDJm+vr6+vr6+vr2Tj4+PiBUMDAwMDAwMDAwMDAwMDAwMDAy9DwwMDL4MDAwMDAwMIam+vr6+vr6+vrugi4+Mj4uIi4yIflEgDAwMDAwMDAwMDAy8DAwMDL4MDAwMDAwMS7W+vr6+vr6+vr6+npGLj4yPj4+Pj4+PiF8gDAwMDAwMDAy+DAwPDL0PDwwPDA8PWr6+vr6+vr6+vr6+vq2Tj4+Lj4yPj5GLj4+PgTsPDA8MDwy9DA8PD74PDw8PDw8Pdb6+vr6+vr6+vr6+vr67ua2npZyVjI+LkY+Rj4+INA8PDw++Dw8PD70PDw8PDw8Pmb6+vr6+vr6+vr6+vr69vr6+vr69VCpffoyLjI+Jj4EPDw++Dw8PD70PDw8PDw8Pq76+vqEaGqq+vr6+vr6+vr68vr6+NxEPDw82e5GMiVEPDw++Dw8REbwRERERERFLtb6+vgsQCzq+vr6+vr6+vpYaGqy7ERERERERERERERERERG9EREUEb4RFBEUERRdvr6+vhAQoma+vr6+vr6+vgkaCTq+FBEUERQRFBEUERQRFBG+ERQUFL4UFBQUFBR1vr6+vqpBQra+vr6+vr6+uxAQoWa+FBQUFBQUFBQUFBQUFBS9FBQUFL4UFBQUFBR2vr6+vr6+vr6+vr6+vr6+vqpCQrayFBQUFBQUFBQUFBQUFBS+FBQUFL4UFBQUFBRivr6qvr6+vr6+vr6+vr6+vr6+vr6CFBQUFBQUFBQUFBQUFBS9FBQXFL4UFxQXFBdLvrNXvr6+vr6+vr6+vr6+vr6+vr4UFxQXFBcUFxQXFBcUFxS+FBcUF74XFBcUFxQXvr62JFd3s72+vr6+vr67rLO7mKgXFBcUFxQXFBcUFxQXFBe+FxQXF74XFxcXFxcXrr6+vrq9vr6+vr6+vr6+uCRXljEXFxcXFxcXFxcXFxcXFxe+FxcXF74XFxcXFxcXhL2+vr6+vr6+vr6+vr6+vb69gxcXFxcXFxcXFxcXFxcXFxe+FxcXF74XFxcXFxcXG667vr6+vr6+vr6+vr6+vrupFxcXFxcXFxcXFxcXFxcXFxe+FxcXHr4eFx4XHhceFx68vb6+vr6+vr6+vr69vrUXHhceFx4XHhceFx4XHhceFx6+HhceF74XHhceFx4XHhceeLu9vb6+vr6+vb6zhxceFx4XHhceFx4XHhceFx4XHhe+Fx4eHr4eHh4eHh4eHh4eHhctXZm+vr6+sGIeHh4eHh4eHh4eHh4eHh4eHh4eHh69Hh4eHr0eHh4eHh4eHmJsdoKNo7u+vr61LR4eHh4eHh4eHh4eHh4eHh4eHh4eHh69Hh4eHLUcHhweHB4cG6u8vr6+vr6+voMeHB4cHhweHB4cHhweHB4cHhweHB4cHhy1HB4cHpJqHB4cHhweHCaZvr6+vr2DLhwcHhweHB4cHhweHB4cHhweHB4cHhweHGqSHhwcHF6+PRwcHBwcHlR6hINoTigZGRwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcPb5eHBwcHByAvW8cHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBxvvYAcHBwcHBwcXpS3vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vreUXhwcHBy/HBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHL+/vx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dv7/AAAAAAAMAAIAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAQAAwAAAAAADAAA=';

    var get_log_msg_url = function(msg)
    {
        msg["rand"] = parseInt(Math.random() * 1000000000);
        var params = [];
        for(var k in msg)
        {
            params.push(encodeURIComponent(k) + "=" + encodeURIComponent(msg[k]));
        }
        return "http://msgs.smarterfox.com/log_msg?" + params.join("&");
    };

    var log_msg_async = function(msg, callback)
    {
        return $.get(get_log_msg_url(msg), {}, function() {
            if(callback) {
                callback();
            }
        }, 'html');
    };

    var hashCode = function(s) {  //adapted from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
        var hash = 0;
        for(var i = 0; i < s.length; i++) {
            hash = ((hash << 5) - hash) + s.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
	
    getBoolPref('add_serp_info_box', function(pref) {
    getStringPref('install-time', function(install_time) {
        if(pref) {
            var query_ddg = function(query, callback) {
                $.get('https://chrome.duckduckgo.com?q=' + encodeURIComponent(query) + '&format=json', {}, callback, 'json');
            };
            //in function search
            //<div class="smarterwiki-serp-info-box google"><div id="ddg_zeroclick"></div></div>

            //<div class="smarterwiki-serp-info-box bing"><div id="ddg_zeroclick"></div></div>
            //in createResultDiv

            //disable "ddg_answer"


            var google_url_regexp = new RegExp("^http(?:|s)://(?:www|encrypted).google.(?:com|ca|co.uk|com.au|co.in|co.id|com.ph)/(?:(?:search\\?|webhp\\?|#)(?:.*&)?q=([^&=]*)(.*)$)?");
            var google_match = google_url_regexp.exec(document.location.href);

            var bing_url_regexp = new RegExp('http://www.bing.com/search*');
            var bing_match = bing_url_regexp.exec(document.location.href);

            var CONFIRM_DISABLE_MSG = "Are you sure you want to disable this?\n\nTo re-enable, go to Options";
            if(/Chrome/.test(navigator.userAgent)) {
                CONFIRM_DISABLE_MSG = "Are you sure you want to disable this?\n\nTo re-enable, go to: \nchrome://chrome/extensions/ -> " + EXTENSION_NAME;
            }
            else {
                CONFIRM_DISABLE_MSG = "Are you sure you want to disable this?\n\nTo re-enable, go to Tools -> FastestFox";
            }

            if(google_match || bing_match) {
                //log_msg_async({'name': 'serp_page_visited'});
                $(document).on('click', '.smarterwiki-serp-info-box .smarterwiki-close-button', function(){
                    if(window.confirm(CONFIRM_DISABLE_MSG)) {
                        setBoolPref('add_serp_info_box', false);
                        $('.smarterwiki-serp-info-box #ddg_zeroclick').slideUp();
                    }
                });
                $(document).on('mouseup', '.smarterwiki-serp-info-box a', function() {
                    var msg = {'name': 'serp_info_box_link_clicked'};
                    var $a = $(this);
                    var original_href = $a.attr("href");
                    msg["redirect_to"] = original_href;
                    $a.attr("href", get_log_msg_url(msg));

                    setTimeout(function()
                    {
                        $a.attr("href", original_href);
                    }, 10);
                });

                setInterval(function()
                {
                    if($('#ddg_zeroclick').length == 1 && $('#smarterwiki-ext-attr').length == 0)
                    {
                        $('#ddg_zeroclick #ddg_zeroclick_abstract').after($('<div id="smarterwiki-attr">' +
                            '<span id="smarterwiki-ext-attr">' +
                                    '<img src="' + EXT_ICON_URL + '" alt="" />' + 
                                    'by ' +
                                    EXTENSION_NAME + 
                             '</span>' + 
                             '<span id="smarterwiki-ddg-attr">' + 
                                    '<a href="http://duckduckgo.com">more from<img src="' + DDG_FAVICON_URL + '" alt="" />DuckDuckGo &raquo;</a>' + 
                            '</span></div>'));
                    }
                }, 100);
            }

            if(google_match)
            {










// BELOW IS CODE FROM Duck Duck Go, Inc.
//
/*
Copyright (c) 2012, Duck Duck Go, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of the DuckDuckGo organization nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER=""> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function()
{
var options = [];
/*
chrome.extension.sendMessage({options: "get"}, function(opt){
    options = opt;
});
*/

function lastQuery()
{
    var regex = new RegExp('[\?\&]q=([^\&#]+)');
    if(regex.test(window.location.href)) {
        var q = window.location.href.split(regex);
        q = q[q.length - 2].replace(/\+/g," ");

        if(options.dev)
            console.log(q)

        return decodeURIComponent(q);
    }
}

var get_query_interval = setInterval(function()
{
    if(lastQuery()) {
        clearInterval(get_query_interval);
        search(lastQuery());
    }
}, 100)

function getQuery(direct) {
    var instant = document.getElementsByClassName("gssb_a");
    if (instant.length !== 0 && !direct){
        var selected_instant = instant[0];
        
        var query = selected_instant.childNodes[0].childNodes[0].childNodes[0].
                    childNodes[0].childNodes[0].childNodes[0].innerHTML;
        query = query.replace(/<\/?(?!\!)[^>]*>/gi, '');

        if(options.dev)
            console.log(query);

        return query;

    } else {
        return document.getElementsByName("q")[0].value;
    }
}

var lasttime;
function qsearch(direct) {
    var query =  getQuery(direct);
    lastquery = query;
    search(query);
}


var lastquery = lastQuery();
// instant search
$(document).on('keyup', 'q', function(e){

    if(lastquery !== getQuery())
        hideZeroClick();

    if(options.dev)
        console.log(e.keyCode);

    var fn = function(){qsearch();};
    if(e.keyCode == 40 || e.keyCode == 38)
        fn = function(){qsearch(true);};

    clearTimeout(lasttime);
    lasttime = setTimeout(fn, 700);

    // instant search suggestions box onclick
    document.getElementsByClassName("gssb_c")[0].onclick = function(){
        if(options.dev)
            console.log("clicked")

        hideZeroClick();
        qsearch(true);
    };
});

// click on search button
$(document).on('click', 'btnG', function(){
    qsearch();
});

function search(query)
{
  //document.getElementById('center_col').innerHTML = ' <div id="zeroclick_loader"> '+
  //    '<img src="http://duckduckgo.com/l.gif" /> Loading ...' +
  //    '</div>' + document.getElementById('center_col').innerHTML;

    var request = {query: query};
    query_ddg(query, function(response){
        renderZeroClick(response, query);
    });
    if (options.dev)
        console.log("query:", query);
 
}

function renderZeroClick(res, query) 
{
    if (options.dev)
        console.log(res);
    
    // disable on images
    if (document.getElementById('isr_pps') !== null)
        return;

    if (res['AnswerType'] !== "") {
        displayAnswer(res['Answer']);
    } else if (res['Type'] == 'A' && res['Abstract'] !== "") {
        displaySummary(res, query);
    } else {     
        switch (res['Type']){
            case 'E':
                displayAnswer(res['Answer']);
                break;

            case 'A':
                displayAnswer(res['Answer']);
                break;

            case 'C':
                displayCategory(res, query);
                break;

            case 'D':
                displayDisambiguation(res, query);
                break;

            default:
                hideZeroClick();
                break;
                    
        } 
    }
}

function hideZeroClick()
{
    var ddg_result = document.getElementById("ddg_zeroclick");
    if (ddg_result !== null)
        ddg_result.style.display = 'none';
}

function showZeroClick()
{
    var ddg_result = document.getElementById("ddg_zeroclick");
    if (ddg_result !== null)
        ddg_result.style.display = 'block';
}

function createResultDiv()
{
    var result = document.getElementById("center_col");
    var ddg_result = document.getElementById("ddg_zeroclick");
    showZeroClick();
    if (ddg_result === null) {
        result.innerHTML = '<div class="smarterwiki-serp-info-box google"><div id="ddg_zeroclick"></div><span id="ddg_attribution">powered by <a href="http://duckduckgo.com">DuckDuckGo</a><img src="' + DDG_FAVICON_URL + '" alt="" /></span></div>' + result.innerHTML;
        ddg_result = document.getElementById("ddg_zeroclick");
    }
    log_msg_async({'name': 'serp_info_box_added'});
    return ddg_result;
}

function resultsLoaded()
{
    if(options.dev)
        console.log(document.getElementById("center_col"), document.getElementById("center_col").style.visibility);
    
    if (document.getElementById("center_col") !== null){
        if (document.getElementById("center_col").style.visibility === "visible") {
            return true;
        }
    }
    
    return false;
}

function displayAnswer(answer)
{
    answer = '';
    if (answer === '') {
        hideZeroClick();
        return;
    }
    if (resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = "ddg_answer";
        ddg_result.innerHTML = answer;
        if(options.dev)
            console.log('showing answer');
    } else {
        if(options.dev)
            console.log('trying again');
        setTimeout('displayAnswer("'+answer+'");', 200);
    }
}

function displaySummary(res, query) {
    var result = ''

    var img_url = res['AbstractURL'];
    var official_site = '';
    var first_category = ''
    var hidden_categories = '';


    if (res['Results'].length !== 0) {
        if(res['Results'][0]['Text'] === "Official site") {
            var url = res['Results'][0]['FirstURL'].match(/https?:\/\/(?:www.)?(.*\.[a-z]+)(?:\/)?/);
            official_site = ' | Official site: <a href="' + res['Results'][0]['FirstURL']+'">' +
                url[1] + '</a>';
            img_url = res['Results'][0]['FirstURL'];
        }
    } 
    

    for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        var link = res['RelatedTopics'][i]['Result'].
                    match(/<a href=".*">.*<\/a>/);

        var cls = (res['RelatedTopics'][i]['FirstURL'].match(/https?:\/\/[a-z0-9\-]+\.[a-z]+(?:\/\d+)?\/c\/.*/) !== null) ? "ddg_zeroclick_category" : "ddg_zeroclick_article";
        
        if (i < 2) {
            var first = (i === 0)? 'first_category': '';
            first_category += '<div class="' + cls + ' '+ first +'" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' + 
                                link +
                              '</div>';
        } else {
            hidden_categories += '<div class="' + cls + '" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' + 
                                link +
                              '</div>';
        }
    }

    if (hidden_categories !== '') {
        hidden_categories  = '<div class="ddg_zeroclick_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=\'ddg_zeroclick_more\'" onclick="this.firstChild.onclick();this.className=\'\';this.onmouseover=function(){}">' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More related topics </a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                    hidden_categories +
                                '</div>';
    }


    result += '<div id="ddg_zeroclick_header">' +
                '<a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'">'+ 
                    (res['Heading'] === ''? "&nbsp;": res['Heading']) +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See more results &raquo; </a>' +
                '</div>';
    
    if (res['Image']) {
        result += '<div id="ddg_zeroclick_image">' + 
                    '<a href="' + img_url +'">' + 
                        '<img class="ddg_zeroclick_img" src="' + res['Image']  +
                        '" />' +
                    '</a>' +
                  '</div>';
    }
    
    var source_base_url = res['AbstractURL'].match(/http.?:\/\/(.*?\.)?(.*\..*?)\/.*/)[2];
    var more_image = '<img src="https://duckduckgo.com/i/'+ source_base_url +'.ico" />';
    if (source_base_url === "wikipedia.org")
        more_image = '<img src="https://duckduckgo.com/assets/icon_wikipedia.v101.png" />';

    result += '<div id="ddg_zeroclick_abstract" style="'+ (res['Image'] ? 'max-width: 420px': '') +'">' +
                '<div onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=\'\'" onclick="window.location.href=\''+ res['AbstractURL'] +'\'">' +
                '<p>' + res['Abstract'] +
                '</p><div id="ddg_zeroclick_official_links">' + 
                    more_image + 
                    '<a class="ddg_more_link" href="' + res['AbstractURL'] + '"> More at ' +
                        res['AbstractSource'] +
                    '</a>' + official_site +
                '</div></div>' +
                 first_category + 
                 hidden_categories + 
              '</div><div class="clear"></div>';


    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
        if(options.dev)
            console.log('loaded and showing');
    } else {
        setTimeout(function(){
            if(options.dev)
                console.log('trying again');
            displaySummary(res, query);
        }, 200);
    }

}

function displayDisambiguation(res, query){
    
    var result = '';
    result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> Meanings of ' +
                    res['Heading'] +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See more results &raquo; </a>' +

              '</div>';

    var disambigs = '' 
    var hidden_disambigs = '';
    var others = '';
    var nhidden = 0;

   for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        if (options.dev)
            console.log(res['RelatedTopics'][i]['Result']);
        
        // other topics
        if(res['RelatedTopics'][i]['Topics']) {
            var topics = res['RelatedTopics'][i]['Topics'];
            var output = '';
            for(var j = 0; j < topics.length; j++){
                output += '<div class="wrapper">' +
                            '<div class="icon_disambig">' + 
                                '<img src="' + topics[j]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                topics[j]['Result'] +
                            '</div>' +
                          '</div>';
            }
            others += '<div class="disambig_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=\'disambig_more\'" onclick="this.firstChild.onclick();this.className=\'disambig_more\';this.onmouseover=function(){}">' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.nextElementSibling.style.display='block';this.onmouseover=null;" +
                                    "this.parentElement.innerHTML = '" + res['RelatedTopics'][i]['Name']  + "<hr>';" +
                                '"> ' + res['RelatedTopics'][i]['Name']  + ' ('+ topics.length + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                    output +
                                '</div>';
            
            continue;
        }
            
 
        if (i <= 2) {
            disambigs += '<div class="wrapper">' +
                            '<div class="icon_disambig">' + 
                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                res['RelatedTopics'][i]['Result'] +
                            '</div>' +
                          '</div>';
        } else {
            hidden_disambigs += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>'; 
            nhidden++;
        }
    }
    
    if (hidden_disambigs!== '') {
        hidden_disambigs  = '<div class="disambig_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="this.firstChild.onclick();this.className=\'disambig_more\';this.onmouseover=function(){}">' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More ('+ nhidden + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                    hidden_disambigs+
                                '</div>';
    }


    result += '<div id="ddg_zeroclick_abstract">' + 
                  disambigs +
                  hidden_disambigs +
                  others +
              '</div><div class="clear"></div>';
              
    
    if (options.dev)
        console.log(result);

    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
    } else {
        setTimeout(function(){
            displayDisambiguation(res, query);
        }, 200);
    }

}

function displayCategory(res, query){
    var result = '';
    result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'">' +
                    res['Heading'] +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See more results &raquo; </a>' +
              '</div>';
    
    var categories = '';
    var hidden_categories = '';
    var nhidden = 0;
    for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        if (options.dev)
            console.log(res['RelatedTopics'][i]['Result']);
 
        if (i <= 2) {
            categories += '<div class="wrapper" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.lastChild.firstChild.href;">' +
                            '<div class="icon_category">' + 
                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_category_item">' +
                                res['RelatedTopics'][i]['Result'] +
                            '</div>' +
                          '</div>';
        } else {
            hidden_categories += '<div class="wrapper" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.lastChild.firstChild.href;">' +
                                '<div class="icon_category">' + 
                                    '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                '</div>' +
                                '<div class="ddg_zeroclick_category_item">' +
                                    res['RelatedTopics'][i]['Result'] +
                                '</div>' +
                              '</div>';

            nhidden++;
        }

    }
    
    if (hidden_categories !== '') {
        hidden_categories = '<div class="category_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="this.firstChild.onclick();this.className=\'category_more\';this.onmouseover=function(){}">' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More ('+ nhidden + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                    hidden_categories+
                                '</div>';
 
    }

    result += '<div id="ddg_zeroclick_abstract">' + 
                    categories +
                    hidden_categories +
                '</div>';
                
    
    if (options.dev)
        console.log(result);

    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
    } else {
        setTimeout(function(){
            displayCategory(res, query);
        }, 200);
    }

}
}());






























/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        	}
            if(bing_match)
            {
(function()
{
var options = [];
/*
chrome.extension.sendMessage({options: "get"}, function(opt){
    options = opt;
});
*/

function lastQuery()
{
    var regex = new RegExp('[\?\&]q=([^\&#]+)');
    if(regex.test(window.location.href)) {
        var q = window.location.href.split(regex);
        q = q[q.length - 2].replace(/\+/g," ");

        if(options.dev)
            console.log(q)

        return decodeURIComponent(q);
    }
}

search(lastQuery());

function getQuery(direct) {
    var instant = document.getElementsByClassName("gssb_a");
    if (instant.length !== 0 && !direct){
        var selected_instant = instant[0];
        
        var query = selected_instant.childNodes[0].childNodes[0].childNodes[0].
                    childNodes[0].childNodes[0].childNodes[0].innerHTML;
        query = query.replace(/<\/?(?!\!)[^>]*>/gi, '');

        if(options.dev)
            console.log(query);

        return query;

    } else {
        return document.getElementsByName("q")[0].value;
    }
}

var lasttime;
function qsearch(direct) {
    var query =  getQuery(direct);
    lastquery = query;
    search(query);
}

var lastquery = document.getElementsByName("q")[0].value;
// instant search
document.getElementsByName("q")[0].onkeyup = function(e){

    if(lastquery !== getQuery())
        hideZeroClick();

    if(options.dev)
        console.log(e.keyCode);

    var fn = function(){qsearch();};
    if(e.keyCode == 40 || e.keyCode == 38)
        fn = function(){qsearch(true);};

    clearTimeout(lasttime);
    lasttime = setTimeout(fn, 700);

    // instant search suggestions box onclick
    document.getElementsByClassName("gssb_c")[0].onclick = function(){
        if(options.dev)
            console.log("clicked")

        hideZeroClick();
        qsearch(true);
    };
};

// click on search button
document.getElementsByName("go")[0].onclick = function(){
    qsearch();
};

function search(query)
{
    var request = {query: query};
    query_ddg(query, function(response){
        renderZeroClick(response, query);
    });
    if (options.dev)
        console.log("query:", query);
 
}

function renderZeroClick(res, query) 
{
    if (options.dev)
        console.log(res);
    
    // disable on images
    if (document.getElementById('isr_pps') !== null)
        return;

    if (res['AnswerType'] !== "") {
        displayAnswer(res['Answer']);
    } else if (res['Type'] == 'A' && res['Abstract'] !== "") {
        displaySummary(res, query);
    } else {     
        switch (res['Type']){
            case 'E':
                displayAnswer(res['Answer']);
                break;

            case 'A':
                displayAnswer(res['Answer']);
                break;

            case 'C':
                displayCategory(res, query);
                break;

            case 'D':
                displayDisambiguation(res, query);
                break;

            default:
                hideZeroClick();
                break;
                    
        } 
    }
}

function hideZeroClick()
{
    var ddg_result = document.getElementById("ddg_zeroclick");
    if (ddg_result !== null)
        ddg_result.style.display = 'none';
}

function showZeroClick()
{
    var ddg_result = document.getElementById("ddg_zeroclick");
    if (ddg_result !== null)
        ddg_result.style.display = 'block';
}

function createResultDiv()
{
    var result = document.getElementById("results_container");
    var ddg_result = document.getElementById("ddg_zeroclick");
    showZeroClick();
    if (ddg_result === null) {
        result.innerHTML = '<div class="smarterwiki-serp-info-box bing"><div id="ddg_zeroclick"></div><span id="ddg_attribution">powered by <a href="http://duckduckgo.com">DuckDuckGo</a><img src="' + DDG_FAVICON_URL + '" alt="" /></span></div>' + result.innerHTML;
        ddg_result = document.getElementById("ddg_zeroclick");
    }
    log_msg_async({'name': 'serp_info_box_added'});
    return ddg_result;
}

function resultsLoaded()
{
    if(options.dev)
        console.log(document.getElementById("results_container"), document.getElementById("results_container").style.visibility);
    
    if (document.getElementById("results_container") !== null){
        return true;
    }
    
    return false;
}

function displayAnswer(answer)
{
    answer = '';
    if (answer === '') {
        hideZeroClick();
        return;
    }
    if (resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = "ddg_answer";
        ddg_result.innerHTML = answer;
        if(options.dev)
            console.log('showing answer');
    } else {
        if(options.dev)
            console.log('trying again');
        setTimeout('displayAnswer("'+answer+'");', 200);
    }
}

function displaySummary(res, query) {
    var result = ''

    var img_url = res['AbstractURL'];
    var official_site = '';
    var first_category = ''
    var hidden_categories = '';


    if (res['Results'].length !== 0) {
        if(res['Results'][0]['Text'] === "Official site") {
            var url = res['Results'][0]['FirstURL'].match(/https?:\/\/(?:www.)?(.*\.[a-z]+)(?:\/)?/);
            official_site = ' | Official site: <a href="' + res['Results'][0]['FirstURL']+'">' +
                url[1] + '</a>';
            img_url = res['Results'][0]['FirstURL'];
        }
    } 
    

    for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        var link = res['RelatedTopics'][i]['Result'].
                    match(/<a href=".*">.*<\/a>/);

        var cls = (res['RelatedTopics'][i]['FirstURL'].match(/https?:\/\/[a-z0-9\-]+\.[a-z]+(?:\/\d+)?\/c\/.*/) !== null) ? "ddg_zeroclick_category" : "ddg_zeroclick_article";
        
        if (i < 2) {
            var first = (i === 0)? 'first_category': '';
            first_category += '<div class="' + cls + ' '+ first +'" >' + 
                                link +
                              '</div>';
        } else {
            hidden_categories += '<div class="' + cls + '" >' + 
                                link +
                              '</div>';
        }
    }

    if (hidden_categories !== '') {
        hidden_categories  = '<div class="ddg_zeroclick_more">' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More related topics </a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;">' + 
                                    hidden_categories +
                                '</div>';
    }


    result += '<div id="ddg_zeroclick_header">' +
                '<a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'">'+ 
                    (res['Heading'] === ''? "&nbsp;": res['Heading']) +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See DuckDuckGo results </a>' +
                '</div>';
    
    if (res['Image']) {
        result += '<div id="ddg_zeroclick_image">' + 
                    '<a href="' + img_url +'">' + 
                        '<img class="ddg_zeroclick_img" src="' + res['Image']  +
                        '" />' +
                    '</a>' +
                  '</div>';
    }
    
    var source_base_url = res['AbstractURL'].match(/http.?:\/\/(.*?\.)?(.*\..*?)\/.*/)[2];
    var more_image = '<img src="https://duckduckgo.com/i/'+ source_base_url +'.ico" />';
    if (source_base_url === "wikipedia.org")
        more_image = '<img src="https://duckduckgo.com/assets/icon_wikipedia.v101.png" />';

    result += '<div id="ddg_zeroclick_abstract" style="'+ (res['Image'] ? 'max-width: 383px': '') +'">' +
                '<div onclick="window.location.href=\''+ res['AbstractURL'] +'\'">' +
                '<p>' + res['Abstract'] +
                '</p><div id="ddg_zeroclick_official_links">' + 
                    more_image + 
                    '<a class="ddg_more_link" href="' + res['AbstractURL'] + '"> More at ' +
                        res['AbstractSource'] +
                    '</a>' + official_site +
                '</div></div>' +
                 first_category + 
                 hidden_categories + 
              '</div><div class="clear"></div>';


    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
        if(options.dev)
            console.log('loaded and showing');
    } else {
        setTimeout(function(){
            if(options.dev)
                console.log('trying again');
            displaySummary(res, query);
        }, 200);
    }

}

function displayDisambiguation(res, query){
    
    var result = '';
    result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> Meanings of ' +
                    res['Heading'] +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See DuckDuckGo results </a>' +

              '</div>';

    var disambigs = '' 
    var hidden_disambigs = '';
    var others = '';
    var nhidden = 0;

   for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        if (options.dev)
            console.log(res['RelatedTopics'][i]['Result']);
        
        // other topics
        if(res['RelatedTopics'][i]['Topics']) {
            var topics = res['RelatedTopics'][i]['Topics'];
            var output = '';
            for(var j = 0; j < topics.length; j++){
                output += '<div class="wrapper">' +
                            '<div class="icon_disambig">' + 
                                '<img src="' + topics[j]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_disambig" >' +
                                topics[j]['Result'] +
                            '</div>' +
                          '</div>';
            }
            others += '<div class="disambig_more" >' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.nextElementSibling.style.display='block';this.onmouseover=null;" +
                                    "this.parentElement.innerHTML = '" + res['RelatedTopics'][i]['Name']  + "<hr>';" +
                                '"> ' + res['RelatedTopics'][i]['Name']  + ' ('+ topics.length + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;">' + 
                                    output +
                                '</div>';
            
            continue;
        }
            
 
        if (i <= 2) {
            disambigs += '<div class="wrapper">' +
                            '<div class="icon_disambig">' + 
                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_disambig" >' +
                                res['RelatedTopics'][i]['Result'] +
                            '</div>' +
                          '</div>';
        } else {
            hidden_disambigs += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" >' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>'; 
            nhidden++;
        }
    }
    
    if (hidden_disambigs!== '') {
        hidden_disambigs  = '<div class="disambig_more" >' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More ('+ nhidden + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;">' + 
                                    hidden_disambigs+
                                '</div>';
    }


    result += '<div id="ddg_zeroclick_abstract">' + 
                  disambigs +
                  hidden_disambigs +
                  others +
              '</div><div class="clear"></div>';
              
    
    if (options.dev)
        console.log(result);

    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
    } else {
        setTimeout(function(){
            displayDisambiguation(res, query);
        }, 200);
    }

}

function displayCategory(res, query){
    var result = '';
    result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'">' +
                    res['Heading'] +
                '</a> <span class="smarterwiki-close-button"><span class="smarterwiki-close-button-inner">Close</span></span><img alt="" src="' + EXT_ICON_URL + '" />' + 
                '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                    encodeURIComponent(query)
                +'"> See DuckDuckGo results </a>' +
              '</div>';
    
    var categories = '';
    var hidden_categories = '';
    var nhidden = 0;
    for (var i = 0; i < res['RelatedTopics'].length; i++){
        if (res['RelatedTopics'].length === 0)
            break;
        
        if (options.dev)
            console.log(res['RelatedTopics'][i]['Result']);
 
        if (i <= 2) {
            categories += '<div class="wrapper" >' +
                            '<div class="icon_category">' + 
                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                            '</div>' +
                            '<div class="ddg_zeroclick_category_item">' +
                                res['RelatedTopics'][i]['Result'] +
                            '</div>' +
                          '</div>';
        } else {
            hidden_categories += '<div class="wrapper" >' +
                                '<div class="icon_category">' + 
                                    '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                '</div>' +
                                '<div class="ddg_zeroclick_category_item">' +
                                    res['RelatedTopics'][i]['Result'] +
                                '</div>' +
                              '</div>';

            nhidden++;
        }

    }
    
    if (hidden_categories !== '') {
        hidden_categories = '<div class="category_more" >' +
                                '<a href="javascript:;" onclick="' + 
                                    "this.parentElement.style.display='none';" +
                                    "this.parentElement.nextElementSibling.style.display='block'" +
                                '"> More ('+ nhidden + ')</a>' +
                             '</div>' + 
                                '<div style="display:none;padding-left:0px;">' + 
                                    hidden_categories+
                                '</div>';
 
    }

    result += '<div id="ddg_zeroclick_abstract">' + 
                    categories +
                    hidden_categories +
                '</div>';
                
    
    if (options.dev)
        console.log(result);

    if(resultsLoaded()) {
        var ddg_result = createResultDiv();
        ddg_result.className = '';
        ddg_result.innerHTML = result;
    } else {
        setTimeout(function(){
            displayCategory(res, query);
        }, 200);
    }

}
}());
            }
        }
    })
    });
});