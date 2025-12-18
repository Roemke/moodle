   #!/bin/sh
   git fetch upstream
   for BRANCH in  MOODLE_311_STABLE MOODLE_401_STABLE MOODLE_405_STABLE  master; do
       git push origin refs/remotes/upstream/$BRANCH:$BRANCH
   done