/**
 * Created by Administrator on 2016/6/25.
 */
var fs=require('fs');

var own_fs_util={};
own_fs_util.iteratorDelete=function(files,parentPath,pathArr){
    files.forEach(function(itemFile){
        var currentPath=parentPath+itemFile;
        fs.stat(currentPath,function(err,stats){
            if(stats.isDirectory()){
                fs.readdir(currentPath,function(err,fils){
                    if(err){
                        return false;
                    }
                    own_fs_util.iteratorDelete(fils,currentPath+"/",pathArr);
                })
            }
            else{
                if(pathArr.indexOf(itemFile)!=-1 || forName(pathArr,itemFile)){
                    fs.exists(currentPath,function(exist){
                        if(exist){
                            fs.unlink(currentPath,function(err){
                                if(err){
                                    return false;
                                }
                            })
                        }
                    });
                }

                function forName(pathA,itemF){
                    var lag=false;
                    pathA.forEach(function(it){
                        if(it.indexOf(itemF)!=-1){
                            lag=true;
                            return true;
                        }
                    })
                    return lag;
                }
            }
        })
    })
};
own_fs_util.cancatJson=function(_root,filename,container){
    fs.readdir(_root,function(err,files){
        if(err){
            return false;
        }
        if(files.length){
            files.forEach(function(item){
                fs.readFile(_root+'/'+item+'/'+filename,'utf-8',function(err,data){
                    if(err){
                        return false;
                    }
                    var json=JSON.parse(data);
                    for(var name in json){
                        container.push(json[name]);
                    }
                })
            })
        }

    });
}

module.exports=own_fs_util;

