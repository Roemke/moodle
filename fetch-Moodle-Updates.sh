   #!/bin/sh
   git fetch upstream
   for BRANCH in MOODLE_31_STABLE MOODLE_35_STABLE MOODLE_310_STABLE MOODLE_311_STABLE MOODLE_400_STABLE MOODLE_401_STABLE master; do
       git push origin refs/remotes/upstream/$BRANCH:$BRANCH
   done