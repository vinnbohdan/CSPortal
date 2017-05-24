Compass 0.12.2
==============

Compass is an open-source CSS Authoring Framework based on SASS.


Installation overview
---------------------

Compass cmd is installed into .bin dir in your project. Compass itself, with Ruby integrated,
is deployed by NuGet, so you don't need Ruby to be installed on target machines.

If you're using NuGet restore, it's safe to ignore NuGet "packages" dir in Git (or in other
VCS), to reduce the size of repository.


Automation
----------

Use ".bin\compass" command to run Compass in your build scripts. For example, here is a simple
MsBuild target to compile scss/sass files to raw css:

<Target Name="CompassCompile">
  <Exec Command=".bin\compass compile" />
</Target>


Daily usage
-----------

Because ".bin" was added to your PATH, you should be able to run Compass directly in the
command prompt from the project dir. For example, if "MySite.Web" is a project dir:

D:\Projects\MySite\MySite.Web> compass watch

Note: add ".bin" to the PATH manually for other developers in your team.
Note: if PATH was changed, restart your command prompt to refresh environment variables.


Docs
----

Read more about Compass at http://compass-style.org/help/
See full Compass reference at http://compass-style.org/reference/compass/


------------------------------------------------------
© 2014 Christopher M. Eppstein