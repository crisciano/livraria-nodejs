// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/livraria$1.0.0/src/app/views/books/list/lista.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\" integrity=\"sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ\" crossorigin=\"anonymous\"><script src=\"https://code.jquery.com/jquery-3.1.1.slim.min.js\" integrity=\"sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n\" crossorigin=\"anonymous\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js\" integrity=\"sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb\" crossorigin=\"anonymous\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js\" integrity=\"sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn\" crossorigin=\"anonymous\"></script></head><body>");

  component_globals_tag({}, out);

  out.w("<section><div class=\"container\"><div class=\"row\"><div class=\"col-12\"><h1> Listagem de books </h1><table class=\"table\" id=\"books\"><thead><tr><td>ID</td><td>Título</td><td>Valor</td><td>Descrição</td><td>Actions</td></tr></thead><tbody>");

  var for__22 = 0;

  marko_forEach(data.books, function(book) {
    var keyscope__23 = "[" + ((for__22++) + "]");

    out.w("<tr id=\"books_" +
      marko_escapeXmlAttr(book.id) +
      "\"><td>" +
      marko_escapeXml(book.id) +
      "</td><td>" +
      marko_escapeXml(book.title) +
      "</td><td>" +
      marko_escapeXml(book.price) +
      "</td><td>" +
      marko_escapeXml(book.description) +
      "</td><td><a class=\"btn btn-primary\" href=\"/books/form/" +
      marko_escapeXmlAttr(book.id) +
      "\">Alter</a><a class=\"btn btn-danger\" href=\"#\" data-ref=\"" +
      marko_escapeXmlAttr(book.id) +
      "\" data-type=\"delete\">Delete</a></td></tr>");
  });

  out.w("</tbody></table></div></div></div></section><script src=\"/public/js/script.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "33");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/livraria$1.0.0/src/app/views/books/list/lista.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
