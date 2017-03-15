scb.components = scb.components || {};

scb.components.MicroscopyModelFactory = function scb_components_MicroscopyModelFactory(model, template) {
  var self = this;

  if (scb.utils.isDefined(model.slide)) { //model here is template.model.microscopy
    self.slide = function(state) {
      var hash_list = [];
      _.each(state.microscopy.lanes_list.list, function(x) {
        if (x.current_slides.length > 0) {
          _.each(x.current_slides, function(slide) {
            hash_list.push(slide.hash);
          });
        }
      });

      var microscopy_lane = state.microscopy_lane;
      var cell_line = microscopy_lane.cell_treatment.cell_line;
      var collection_id = microscopy_lane.cell_treatment.treatment_list.first.collection_id;
      var drug_id = microscopy_lane.cell_treatment.treatment_list.first.drug_list.list[0].drug_id;
      var slide_type = microscopy_lane.kind;
      var conditions = microscopy_lane.slide_conditions;
      var imgs = [];
      var isFound = false;
      var max;
      var index;
      var alreadySelected;
      var number_of_comparisons;
      var slide_array = [];
      var parser = model.slide;

      if (parser.parser_simple) {

        var micro_state = {
          kind: function(str) {
            return str == slide_type;
          },
          collection_id: function(str) {
            return str == collection_id;
          },
          drug_id: function(str) {
            return str == drug_id;
          },
          cell_line: function(str) {
            return str == cell_line;
          },
          conditions: function(str) {
            return str == conditions;
          }
        };
        _.each(parser.parser_simple, function(rule) {
          var matches = true;
          _.each(rule.match, function(property) {
            if (micro_state[property]) {
              matches &= micro_state[property](rule[property]);
            } else {
              console.info("UNDEFINED PROPERTY: " + property);
            }
          });
          if (!isFound) {
            if (matches) {
              if (template.slide_parser) {
                max = template.slide_parser[collection_id][slide_type][conditions].length;
              } else {
                max = rule.imgs_hash.length;
              }
              number_of_comparisons = 0;
              do {
                /*Math.random returns num in [0,1) so no need to worry about subtracting 1 from index*/
                index = Math.floor(Math.random() * (max));
                if (template.slide_parser) {
                  slide_array = template.slide_parser[collection_id][slide_type][conditions][index];
                } else {
                  slide_array = rule.imgs_hash[index];
                  for (var x = 0; x < slide_array.length; x++) {
                    if (!slide_array[x].hasOwnProperty('mag')) {
                      slide_array[x].mag = "N/A"
                    }
                  }
                }

                alreadySelected = false;
                _.each(slide_array, function(x) {
                  if (_.contains(hash_list, x.hash)) {
                    alreadySelected = true;
                  }
                });
                number_of_comparisons += 1;
              } while (alreadySelected && number_of_comparisons < max);
              imgs = slide_array;
              isFound = true;
            }
          }
        });
        state.slides = imgs;
        state.slide_type = slide_type;
      } else if (parser.complex_parser) {
        var micro_state = {
          drug_id: function(drug_list) {
            return drug_list.indexOf(drug_id) > -1;
          },
          cell_line: function(str) {
            //make it a list and you compare to each one in list not just str
            return str == cell_line;
          }
        };

        _.each(parser.complex_parser, function(rule) {
          if (rule.match.length == 0) {
            img_str = '../images/microscopy/black.jpg'
          } else {
            var matches = true;
            _.each(rule.match, function(property) {
              if (micro_state[property]) {
                matches &= micro_state[property](rule[property]);
              } else {
                console.info("UNDEFINED PROPERTY: " + property);
              }
            });
            if (!isFound) {
              if (matches) {
                var phenotype = rule.phenotype;
                max = template.slide_parser[collection_id][slide_type][conditions][phenotype].length;
                number_of_comparisons = 0;
                do {
                  index = Math.floor(Math.random() * (max - 1 + 1));
                  slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
                  alreadySelected = false;
                  _.each(slide_array, function(x) {
                    if (_.contains(hash_list, x.hash)) {
                      alreadySelected = true;
                    }
                  });
                  number_of_comparisons = number_of_comparisons + 1;
                } while (alreadySelected && number_of_comparisons < max);
                imgs = slide_array;
                isFound = true;
              }
            }
          }
        });
        state.slides = imgs;
        state.slide_type = slide_type;
      } else if (parser.conditions_parser) {
        var micro_state = {
          drug_id: function(arr) {
            var hasVal = false;
            for (var x = 0; x < arr.length; x++) {
              if (arr[x] == drug_id) {
                hasVal = true;
              }
            }
            return hasVal;
          },
          cell_line: function(str) {
            //make it a list and you compare to each one in list not just str
            return str == cell_line;
          },
          conditions: function(str) {
            return str == conditions;
          }
        };
        _.each(parser.conditions_parser, function(rule) {
          if (rule.match.length == 0) {
            img_str = '../images/microscopy/black.jpg'
          } else {
            var matches = true;
            _.each(rule.match, function(property) {
              if (micro_state[property]) {
                matches &= micro_state[property](rule[property]);
              } else {
                console.info("UNDEFINED PROPERTY: " + property);
              }
            });
            if (!isFound) {
              if (matches) {
                var phenotype = rule.phenotype;
                var max = template.slide_parser[collection_id][slide_type][conditions][phenotype].length;
                var index = Math.floor(Math.random() * (max - 1 + 1));
                var slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
                var alreadySelected = false;
                _.each(slide_array, function(x) {
                  if (_.contains(hash_list, x.hash)) {
                    alreadySelected = true;
                  }
                });
                var number_of_comparisons = 0;
                while (alreadySelected && number_of_comparisons < max) {
                  console.info(number_of_comparisons);
                  index = Math.floor(Math.random() * (max - 1 + 1));
                  slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
                  alreadySelected = false;
                  _.each(slide_array, function(x) {
                    if (_.contains(hash_list, x.hash)) {
                      alreadySelected = true;
                    }
                  });
                  number_of_comparisons = number_of_comparisons + 1;
                }
                imgs = slide_array;
                isFound = true;
              }
            }
          }
        });
        state.slides = imgs;
        state.slide_type = slide_type;

      }
    }
  }

  if (scb.utils.isDefined(model.is_ab)) {
    self.slide = function(state) {
      var kind = state.microscopy_lane.kind;
      var conditions = state.microscopy_lane.slide_conditions;
      var identifier = state.microscopy_lane.cell_treatment.identifier;
      var key = kind + "%%" + conditions + "%%" + identifier;
      var image_state = model[key];

      var max = image_state['slides'].length;
      var random_num = Math.floor(Math.random() * (max));
      state.slides = image_state['slides'][random_num];
      state.slide_type = image_state['slide_type'];
    }
  }

  self.compute = function(state) {
    return self.slide(state);
  }
}