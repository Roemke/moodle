$capabilities = array(
    'block/show_keys:addcoursesection' => array(
        'riskbitmask' =>  RISK_PERSONAL ,
        'captype' => 'write',
        'contextlevel' => CONTEXT_BLOCK,
        'archetypes' => array(
            'admin' => CAP_ALLOW
        )
    ) 
    // Add more capabilities here ...
)
