   #!/bin/sh
   git fetch upstream
   for BRANCH in MOODLE_29_STABLE MOODLE_31_STABLE master; do
       git push origin refs/remotes/upstream/$BRANCH:$BRANCH
   done