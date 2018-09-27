<?php
  class block_show_keys extends block_base // block_list //block_base 
  {
    function init()
    {
      $this->title = get_string('show_keys','block_show_keys');
    }

    function get_content() 
    {
      global $DB;
      
      if ($this->content !== NULL) 
      {
        return $this->content;
      }
      $courseCategoryName = $this->config->cat;
      $courseCategoryName = trim ($courseCategoryName);
      $this->content         =  new stdClass;
      //$this->content->text   = 'Content: never travel without your towel'; 
      //$this->content->items = array();
      //$this->content->icons = array(); //without icons - yes it works
      $this->content->footer = '';
      //get id of categorie "klassen"
      //echo $courseCategoryName;
      $warning=get_string('warning','block_show_keys');        
      if ($courseCategoryName == "")
        $this->content->text = $warning; //$this->content->items[] = $warning; 
      {
        $sql = "SELECT shortname,  password FROM {course} JOIN {enrol} ON ( {course}.id = {enrol}.courseid ) " 
             . "JOIN {course_categories} ON ( {course}.category = {course_categories}.id ) "
             . "WHERE {course_categories}.name = ?  AND enrol = ?";
        $results = $DB->get_records_sql($sql, array($courseCategoryName, 'self'));
        //echo count($results);
        if (count($results) === 0)
          $this->content->text = $warning; //$this->content->items[] = $warning;
        else //ergebnis da
        {      
          //$this->content->items[] = "First: 42 or " . $courseId->id;
          $this->content->text = "<table>\n";
          foreach ($results as &$entry)
          {
            //$this->content->items[] = $entry->shortname . ": " . $entry->password ;
            $this->content->text .= "<tr><td>". $entry->shortname . ":</td><td>" . $entry->password ."</td></tr>\n" ;
          }
          $this->content->text .= "</table>";
        }
      }
      return $this->content;
    }
    
    function preferred_width() 
    {
      // The preferred value is in pixels
        return 400;
    }
    //need config
    function instance_allow_config() 
    {
      return true;
    }
    
    function instance_allow_multiple() 
    {
      return false;
    }
  }	
  //close php - not in the other files?
?>
