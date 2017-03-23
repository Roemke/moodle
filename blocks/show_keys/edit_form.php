<?php
class block_show_keys_edit_form extends block_edit_form 
{
  protected function specific_definition($mform) 
  { 
    
    //so haengt er sich auf 
   /* 
   if (has_capability("block/show_keys:addCourseSection",$this->block->context->id)
   {
     echo "ja";
   }
   */
   //Mist, das folgende klappt einfach nicht
   //if (!$cm = get_coursemodule_from_id('show_keys', $this->block->context->id)) {
   //    error("Course module ID was incorrect");
   /*
    echo "<pre>";  
    var_dump($this->block->context);
    var_dump ( get_users_by_capability ('block/show_keys:addcoursesection', $this->context));
    echo "</pre>";
    
    require_capability('block/show_keys:addcoursesection', $this->block->context);
    
    habe ich nicht hinbekommen, wollte erreichen, dass man admin sein muss, um
    den bereich einzutragen
    entziehe statt dessen die Rechte zum editieren */
    // Section header title according to language file.
    $mform->addElement('header', 'configheader', get_string('blocksettings', 'block'));
    // A sample string variable with a default value.
    $mform->addElement('text','config_cat',get_string('categorieText','block_show_keys'));	  
    //$mform->setDefault('config_cat','Klassen'); besser ohne default - ist halt ein 
    //risiko alle keys anzuzeigen
    $description = get_string('categorieDescription','block_show_keys');
    $mform->addElement('html', "<div>$description</div");        
  }
}