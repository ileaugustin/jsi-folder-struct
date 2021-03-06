const folders = [
  {
    type: 'dir',
    name: 'app',
    children: [
      {
        type: 'file',
        name: 'index.html'
      },
      {
        type: 'dir',
        name: 'js',
        children: [
          {
            type: 'file',
            name: 'main.js'
          },
          {
            type: 'file',
            name: 'app.js'
          },
          {
            type: 'file',
            name: 'misc.js'
          },
          {
            type: 'dir',
            name: 'vendor',
            children: [
              {
                type: 'file',
                name: 'jquery.js'
              },
              {
                type: 'file',
                name: 'underscore.js'
              }
            ]
          }
        ]
      },
      {
        type: 'dir',
        name: 'css',
        children: [
          {
            type: 'file',
            name: 'reset.css'
          },
          {
            type: 'file',
            name: 'main.css'
          }
        ]
      }
    ]
  }
];

var searchResult = [];

function to_ul(obj) {
  var ul = document.createElement("ul");
  ul.setAttribute('class','folder-container');

  for (var i in obj) {

    var file = obj[i];
    var li = document.createElement("li");
    var li2 = document.createElement("li");
    var text = document.createTextNode(file.name);

    li2.setAttribute('class','folder-wrapper');
    li.appendChild(text);

    if(file.type == 'dir')
    {
      li.setAttribute('class','folder-item');
    }
    else if(file.type == 'file')
    {
      li.setAttribute('class','file-item');
    }

    if (file.children) {
      li2.appendChild(to_ul(file.children));
    }

    ul.appendChild(li);
    ul.appendChild(li2);
  }

  return ul;
}

function filterFolder(obj) {

  var search = document.getElementById('search').value;

  for(var i in obj){

    var file = obj[i];
    var str = '';
    str+= file.name;

    if(str.indexOf(search) > -1){

      if(file.type == 'dir')
      {
        searchResult.push(file);
      }
      else if(file.type == 'file')
      {
        searchResult.push(file);
      }
    }
    else if(file.children){
      filterFolder(file.children)
    }

  }

  return searchResult;
}

function searchingFor(){
  var search = document.getElementById('search').value;
  if(search)
  {
    document.getElementById('searchValue').innerHTML = 'Searching for : ' + search;
  }
  else
  {
    document.getElementById('searchValue').innerHTML = '';
  }
}

function search() {
  searchingFor();
  filterFolder(folders);
  var ul = to_ul(searchResult);
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').appendChild(ul);
  searchResult = [];
}

search();