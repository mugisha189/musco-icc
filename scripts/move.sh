# A shell script to move all files in current directory to a new directory which has the same name as each file
# the file moved should get a name of page.tsx 
#  example: fixtures.tsx => fixtures/page.tsx

# get the current directory
current_dir=$(pwd)

# get the list of files in the current directory exclude directories
files=$(ls)
echo $files

# loop through the files
for file in $files
do
  # check if the file is a directory
  if [ -d $file ]; then
    echo "Skipping directory $file"
  else
    file_name=$(basename $file .tsx)
    echo "Moving file $file_name to $file_name/page.tsx"
    # create a new directory with the same name as the file
    mkdir $file_name
    # rename the file to page.tsx
    mv $file page.tsx
    # move the file to the new directory
    mv page.tsx $file_name
  fi
done
