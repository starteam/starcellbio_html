'use strict';

if (typeof (scb.ui) == 'undefined') {
  scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorExperimentSetupPage2View = scb.ui.static.InstructorExperimentSetupPage2View || {};



scb.ui.static.InstructorExperimentSetupPage2View.parse = function(element) {
  var assignment_id = $(element).attr('assignment_id');


  var state = {
    assignment_id: assignment_id,
    view: 'assignments',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);

  return parsed;
}




scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_page2_save_assignment_button = function(element, workarea) {

  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

  if (parsed.assignment.has_start_time) {
    parsed.assignment.template.ui.experiment_setup.table[2].children.splice(2, 0, {
      kind: "start",
      title: "Treatment Start Time",
      editable: false
    });
    parsed.assignment.template.ui.add_multiple_dialog.headings.push('Start Time');
  }
  if (parsed.assignment.has_duration) {
    parsed.assignment.template.ui.experiment_setup.table[2].children.splice(3, 0, {
      kind: "duration",
      title: "Duration",
      editable: false
    });
    parsed.assignment.template.ui.add_multiple_dialog.headings.push('Duration');
  }
  if (parsed.assignment.has_collection_time) {
    parsed.assignment.template.ui.experiment_setup.table[2].children.splice(4, 0, {
      kind: "collection",
      title: "Collection Timepoints",
      editable: false
    });
    parsed.assignment.template.ui.add_multiple_dialog.headings.push('Collection');

  }
  if (parsed.assignment.has_temperature) {
    parsed.assignment.template.ui.experiment_setup.table.splice(3, 0, {
      kind: 'temperature',
      title: 'Temperature',
      editable: false
    });
    parsed.assignment.template.ui.add_multiple_dialog.headings.push('Temperature');
  }
  //collection_id: 'default'


  _.each(parsed.assignment.template.cell_lines, function(strain, strain_id, list) {
    parsed.assignment.template.ui.add_multiple_dialog[strain_id] = {
      rows: []
    }
    parsed.assignment.template.ui.add_multiple_dialog.order.push(strain_id);
    _.each(parsed.assignment.template.drugs, function(drug, drug_id, list) {

      if (parsed.assignment.has_collection_time && parsed.assignment.has_temperature) {
        _.each(parsed.assignment.template.collections, function(collection, collection_id, list) {
          _.each(parsed.assignment.template.experiment_temperatures, function(temperature, temperature_id, list) {
            var row_treatment_id = Math.random().toString(36).substring(10);
            var row_element = {
              cells: [
                {
                  kind: 'checkbox',
                  name: "X",
                  treatment_id: row_treatment_id
                },
                {
                  kind: 'text',
                  text: strain.name
                },
                {
                  kind: 'text',
                  text: drug.name
                },
                {
                  kind: 'text',
                  text: parsed.assignment.template.concentrations[drug.concentrations[0]].name
                },
                {
                  kind: 'text',
                  text: collection.name
                },
                {
                  kind: 'text',
                  text: temperature.name
                }
              ],
              treatment_id: row_treatment_id,
              cell_treatments: {
                "X": [
                  {
                    cell_line: strain_id,
                    treatment_list: {
                      list: [
                        {
                          drug_list: {
                            list: [
                              {
                                drug_id: drug_id,
                                concentration_id: drug.concentrations[0]
                              },
                            ]
                          },
                          collection_id: collection_id,
                          temperature: temperature_id
                        }
                      ]
                    }
                  }
                ]
              }
            };
            if (parsed.assignment.has_start_time) {
              row_element.cell_treatments.X[0].treatment_list.list[0]['schedule'] = drug.schedule[0];
              row_element.cells.splice(4, 0, {
                kind: 'text',
                text: parsed.assignment.template.start_times[drug.schedule[0]].name
              });

            }
            if (parsed.assignment.has_duration) {
              row_element.cell_treatments.X[0].treatment_list.list[0]['duration'] = drug.duration[0];
              row_element.cells.splice(5, 0, {
                kind: 'text',
                text: parsed.assignment.template.durations[drug.duration[0]].name
              });
            }
            parsed.assignment.template.ui.add_multiple_dialog[strain_id].rows.push(row_element);
          });
        });

      } else if (parsed.assignment.has_collection_time) {
        _.each(parsed.assignment.template.collections, function(collection, collection_id, list) {
          var row_treatment_id = Math.random().toString(36).substring(10);
          var row_element = {
            cells: [
              {
                kind: 'checkbox',
                name: "X",
                treatment_id: row_treatment_id
              },
              {
                kind: 'text',
                text: strain.name
              },
              {
                kind: 'text',
                text: drug.name
              },
              {
                kind: 'text',
                text: parsed.assignment.template.concentrations[drug.concentrations[0]].name
              },
              {
                kind: 'text',
                text: collection.name
              }
            ],
            treatment_id: row_treatment_id,
            cell_treatments: {
              "X": [
                {
                  cell_line: strain_id,
                  treatment_list: {
                    list: [
                      {
                        drug_list: {
                          list: [
                            {
                              drug_id: drug_id,
                              concentration_id: drug.concentrations[0]
                            },
                          ]
                        },
                        collection_id: collection_id
                      }
                    ]
                  }
                }
              ]
            }
          };
          if (parsed.assignment.has_start_time) {
            row_element.cell_treatments.X[0].treatment_list.list[0]['schedule'] = drug.schedule[0];
            row_element.cells.splice(4, 0, {
              kind: 'text',
              text: parsed.assignment.template.start_times[drug.schedule[0]].name
            });
          }
          if (parsed.assignment.has_duration) {
            row_element.cell_treatments.X[0].treatment_list.list[0]['duration'] = drug.duration[0];
            row_element.cells.splice(5, 0, {
              kind: 'text',
              text: parsed.assignment.template.durations[drug.duration[0]].name
            });

          }
          parsed.assignment.template.ui.add_multiple_dialog[strain_id].rows.push(row_element);
        });

      } else if (parsed.assignment.has_temperature) {
        _.each(parsed.assignment.template.experiment_temperatures, function(temperature, temperature_id, list) {
          var row_treatment_id = Math.random().toString(36).substring(10);
          var row_element = {
            cells: [
              {
                kind: 'checkbox',
                name: "X",
                treatment_id: row_treatment_id
              },
              {
                kind: 'text',
                text: strain.name
              },
              {
                kind: 'text',
                text: drug.name
              },
              {
                kind: 'text',
                text: parsed.assignment.template.concentrations[drug.concentrations[0]].name
              },
              {
                kind: 'text',
                text: temperature.name
              }
            ],
            treatment_id: row_treatment_id,
            cell_treatments: {
              "X": [
                {
                  cell_line: strain_id,
                  treatment_list: {
                    list: [
                      {
                        drug_list: {
                          list: [
                            {
                              drug_id: drug_id,
                              concentration_id: drug.concentrations[0]
                            },
                          ]
                        },
                        temperature: temperature_id
                      }
                    ]
                  }
                }
              ]
            }
          };
          if (parsed.assignment.has_start_time) {
            row_element.cell_treatments.X[0].treatment_list.list[0]['schedule'] = drug.schedule[0];
            row_element.cells.splice(4, 0, {
              kind: 'text',
              text: parsed.assignment.template.start_times[drug.schedule[0]].name
            });
          }
          if (parsed.assignment.has_duration) {
            row_element.cell_treatments.X[0].treatment_list.list[0]['duration'] = drug.duration[0];
            row_element.cells.splice(5, 0, {
              kind: 'text',
              text: parsed.assignment.template.durations[drug.duration[0]].name
            });
          }
          parsed.assignment.template.ui.add_multiple_dialog[strain_id].rows.push(row_element);
        });

      } else {
        var row_treatment_id = Math.random().toString(36).substring(10);
        var row_element = {
          cells: [
            {
              kind: 'checkbox',
              name: "X",
              treatment_id: row_treatment_id
            },
            {
              kind: 'text',
              text: strain.name
            },
            {
              kind: 'text',
              text: drug.name
            },
            {
              kind: 'text',
              text: parsed.assignment.template.concentrations[drug.concentrations[0]].name
            },
          ],
          treatment_id: row_treatment_id,
          cell_treatments: {
            "X": [
              {
                cell_line: strain_id,
                treatment_list: {
                  list: [
                    {
                      drug_list: {
                        list: [
                          {
                            drug_id: drug_id,
                            concentration_id: drug.concentrations[0]
                          },
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        };
        if (parsed.assignment.has_start_time) {
          row_element.cell_treatments.X[0].treatment_list.list[0]['schedule'] = drug.schedule[0];
          row_element.cells.splice(4, 0, {
            kind: 'text',
            text: parsed.assignment.template.start_times[drug.schedule[0]].name
          });
        }
        if (parsed.assignment.has_duration) {
          row_element.cell_treatments.X[0].treatment_list.list[0]['duration'] = drug.duration[0];
          row_element.cells.splice(5, 0, {
            kind: 'text',
            text: parsed.assignment.template.durations[drug.duration[0]].name
          });
        }
        parsed.assignment.template.ui.add_multiple_dialog[strain_id].rows.push(row_element);

      }

    });
  });



  scb.ui.static.InstructorFrame.pending_save(parsed);


  var state = {
    assignment_id: parsed.assignment.id,
    view: 'experiment_setup_page3',
    skip_hash_update: true
  };

  scb.ui.static.InstructorFrame.refresh(state);
}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var treatment_id = $(element).attr('treatment_id') ? $(element).attr('treatment_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  if (parsed.assignment.template.drugs[treatment_id]) {
    parsed.assignment.template.drugs[treatment_id] = {
      concentrations: parsed.assignment.template.drugs[treatment_id].concentrations,
      name: $(element).val(),
      schedule: parsed.assignment.template.drugs[treatment_id].schedule,
      duration: parsed.assignment.template.drugs[treatment_id].duration
    };
  } else {
    parsed.assignment.template.drugs[treatment_id] = {
      concentrations: [],
      name: $(element).val(),
      schedule: [],
      duration: []
    };
  }
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var concentration_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var units = $('.scb_f_experiment_setup_treatment_concentration_units_edit select[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.concentrations[concentration_id] = {
    value: concentration_id,
    name: $(element).val() + ' ' + units,
    conc: $(element).val(),
    units: units
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].concentrations.length > 0) {
    delete parsed.assignment.template.concentrations[parsed.assignment.template.drugs[treatment_id].concentrations[0]];
  }
  parsed.assignment.template.drugs[treatment_id].concentrations = [];
  parsed.assignment.template.drugs[treatment_id].concentrations.push(concentration_id);
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_units_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var concentration_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var treatment_val = $('.scb_f_experiment_setup_treatment_concentration_edit[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.concentrations[concentration_id] = {
    value: concentration_id,
    name: treatment_val + ' ' + $(element).val(),
    conc: treatment_val,
    units: $(element).val()
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].concentrations.length > 0) {
    delete parsed.assignment.template.concentrations[parsed.assignment.template.drugs[treatment_id].concentrations[0]];
  }
  parsed.assignment.template.drugs[treatment_id].concentrations = [];
  parsed.assignment.template.drugs[treatment_id].concentrations.push(concentration_id);
  scb.ui.static.InstructorFrame.refresh();


}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var start_time_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var units = $('.scb_f_experiment_setup_start_time_units_edit select[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.start_times[start_time_id] = {
    name: $(element).val() + ' ' + units,
    time: $(element).val(),
    units: units
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].schedule.length > 0) {
    delete parsed.assignment.template.start_times[parsed.assignment.template.drugs[treatment_id].schedule[0]];
  }
  parsed.assignment.template.drugs[treatment_id].schedule = [];
  parsed.assignment.template.drugs[treatment_id].schedule.push(start_time_id);
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_units_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var start_time_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var start_time_val = $('.scb_f_experiment_setup_start_time_edit[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.start_times[start_time_id] = {
    name: start_time_val + ' ' + $(element).val(),
    time: start_time_val,
    units: $(element).val()
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].schedule.length > 0) {
    delete parsed.assignment.template.start_times[parsed.assignment.template.drugs[treatment_id].schedule[0]];
  }
  parsed.assignment.template.drugs[treatment_id].schedule = [];
  parsed.assignment.template.drugs[treatment_id].schedule.push(start_time_id);
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var duration_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var units = $('.scb_f_experiment_setup_duration_units_edit select[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.durations[duration_id] = {
    name: $(element).val() + ' ' + units,
    duration: $(element).val(),
    units: units
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].duration.length > 0) {
    delete parsed.assignment.template.durations[parsed.assignment.template.drugs[treatment_id].duration[0]];
  }
  parsed.assignment.template.drugs[treatment_id].duration = [];
  parsed.assignment.template.drugs[treatment_id].duration.push(duration_id);
  scb.ui.static.InstructorFrame.refresh();
}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_units_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var duration_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  var duration_val = $('.scb_f_experiment_setup_duration_edit[treatment_id="' + $(element).attr('treatment_id') + '"]').val();
  parsed.assignment.template.durations[duration_id] = {
    name: duration_val + ' ' + $(element).val(),
    duration: duration_val,
    units: $(element).val()
  };
  var treatment_id = $(element).attr('treatment_id');
  if (parsed.assignment.template.drugs[treatment_id].duration.length > 0) {
    delete parsed.assignment.template.durations[parsed.assignment.template.drugs[treatment_id].duration[0]];
  }
  parsed.assignment.template.drugs[treatment_id].duration = [];
  parsed.assignment.template.drugs[treatment_id].duration.push(duration_id);
  scb.ui.static.InstructorFrame.refresh();
}




scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_treatment = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var drug_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  parsed.assignment.template.drugs[drug_id] = {
    concentrations: [],
    name: $(element).val(),
    schedule: [],
    duration: []
  };;
  scb.ui.static.InstructorFrame.refresh();
}


scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_temperature_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var temperature_id = $(element).attr('temperature_id') ? $(element).attr('temperature_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  parsed.assignment.template.experiment_temperatures[temperature_id] = {
    name: $(element).val() + degreeEntity + "C",
    temp: $(element).val()
  };
  scb.ui.static.InstructorFrame.refresh();
}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_temperature = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var temperature_id = $(element).attr('temperature_id') ? $(element).attr('temperature_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  parsed.assignment.template.experiment_temperatures[temperature_id] = {
    name: $(element).val() + degreeEntity + "C",
    temp: $(element).val()
  };
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_collection_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var collection_id = $(element).attr('collection_id') ? $(element).attr('collection_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  parsed.assignment.template.collections[collection_id] = {
    name: $(element).val()
  };
  scb.ui.static.InstructorFrame.refresh();
}


scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_collection = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var collection_id = $(element).attr('collection_id') ? $(element).attr('collection_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  parsed.assignment.template.collections[collection_id] = {
    name: $(element).val()
  };
  scb.ui.static.InstructorFrame.refresh();

}


scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_treatment = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var treatment_id = $(element).attr('treatment_id');
  delete parsed.assignment.template.drugs[treatment_id];
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_temperature = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var temperature_id = $(element).attr('temperature_id');
  delete parsed.assignment.template.experiment_temperatures[temperature_id];
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_collection = function(element, workarea) {
  var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
  var collection_id = $(element).attr('collection_id');
  delete parsed.assignment.template.collections[collection_id];
  scb.ui.static.InstructorFrame.refresh();

}




scb.ui.static.InstructorExperimentSetupPage2View.register = function(workarea) {

  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page2_save_assignment_button', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_page2_save_assignment_button(this, e);
  });

  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_concentration_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_concentration_units_edit select', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_units_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_start_time_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_start_time_units_edit select', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_units_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_duration_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_duration_units_edit select', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_units_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_temperature_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_temperature_edit(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_collection_edit', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_collection_edit(this, e);
  });



  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_add_temperature', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_temperature(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_add_treatment', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_treatment(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_add_collection', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_add_collection(this, e);
  });



  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_remove_treatment', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_treatment(this, e);
  });
  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_remove_temperature', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_temperature(this, e);
  });
  scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_remove_collection', function(e) {
    scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_remove_collection(this, e);
  });

};

scb.ui.InstructorExperimentSetupPage2View = function scb_ui_InstructorExperimentSetupPage2View(gstate) {
  var self = this;
  var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
  var courses = _.groupBy(assignments.list, function(assignment) {
    return (assignment.course);
  });
  self.show = function(state) {
    window.assignments = assignments;
    var workarea = gstate.workarea;
    var last_step = 1;
    var prev_step;

    var kind = 'select_course';

    if (assignments.selected.course_prepared) {
      kind = 'create_assignment';
    }


    if (assignments.selected.experiments.selected != null) {
      prev_step = assignments.selected.experiments.selected.prev_step;
    } else {
      prev_step = null;
    }


    workarea.html(scb_instructor_experiment_setup_page2.main({
      global_template: gstate.context.master_model,
      assignments: assignments,
      last_step: last_step,
      prev_step: prev_step,
      kind: kind,
      assignment: assignments.selected,
      context: gstate.context,
      courses: courses,
    }));

    document.title = "Assignments - StarCellBio"
    $('.scb_s_ref_info_link').click(function() {
      $('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
    });


    $('#main').css({
      position: 'absolute',
      left: ($(window).width() - $('#main').outerWidth()) / 2,
      top: 0
    });
    $(window).resize(function() {

      $('#main').css({
        position: 'absolute',
        left: ($(window).width() - $('#main').outerWidth()) / 2,
        top: ($(window).height() - $('#main').outerHeight()) / 2
      });

    });

  }

}