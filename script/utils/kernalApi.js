export class  kernalApiList{
    constructor(option={
        思源伺服ip:"127.0.0.1",
        思源伺服端口:"6806",
        思源伺服协议:"http"
    }){
    let 思源伺服ip =  option.思源伺服ip||"127.0.0.1"
    let 思源伺服端口 =  option.思源伺服端口||"6806"
    let 思源伺服协议 =  option.思源伺服协议||"http"
    this.思源伺服地址 = 思源伺服协议+ "://"+思源伺服ip+":"+思源伺服端口
    this.set("GET", "/api/system/bootProgress", "bootProgress","获取启动进度")
	this.set("POST", "/api/system/bootProgress", "bootProgress")
	this.set("GET", "/api/system/version", "version","获取软件版本")
	this.set("POST", "/api/system/version", "version","获取软件版本")
	this.set("POST", "/api/system/currentTime", "currentTime","获取当前时间")
	this.set("POST", "/api/system/uiproc", "addUIProcess","UI生成进度")
	this.set("POST", "/api/system/loginAuth", "LoginAuth","登录")
	this.set("POST", "/api/system/logoutAuth", "LogoutAuth","退出登录")
	// 需要鉴权
	this.set("POST", "/api/system/getEmojiConf", 'getEmojiConf')
	this.set("POST", "/api/system/setAccessAuthCode",  'setAccessAuthCode')
	this.set("POST", "/api/system/setNetworkServe", 'setNetworkServe')
	this.set("POST", "/api/system/setUploadErrLog", 'setUploadErrLog')
	this.set("POST", "/api/system/setNetworkProxy",  'setNetworkProxy')
	this.set("POST", "/api/system/setWorkspaceDir",  'setWorkspaceDir')
	this.set("POST", "/api/system/listWorkspaceDirs",'listWorkspaceDirs')
	this.set("POST", "/api/system/setAppearanceMode",  'setAppearanceMode')
	this.set("POST", "/api/system/getSysFonts", 'getSysFonts')
	this.set("POST", "/api/system/setE2EEPasswd",  'setE2EEPasswd')
	this.set("POST", "/api/system/exit",'exit')
	this.set("POST", "/api/system/setUILayout", 'setUILayout')
	this.set("POST", "/api/system/getConf",  'getConf')
	this.set("POST", "/api/system/checkUpdate", 'checkUpdate')
    //登录
	this.set("POST", "/api/account/login",  'login')
	this.set("POST", "/api/account/checkActivationcode", 'checkActivationcode')
	this.set("POST", "/api/account/useActivationcode",  'useActivationcode')
	this.set("POST", "/api/account/deactivate",  'deactivateUser')
    //笔记本相关
	this.set("POST", "/api/notebook/lsNotebooks",  'lsNotebooks')
	this.set("POST", "/api/notebook/openNotebook",  'openNotebook')
	this.set("POST", "/api/notebook/closeNotebook",  'closeNotebook')
	this.set("POST", "/api/notebook/getNotebookConf",  'getNotebookConf')
	this.set("POST", "/api/notebook/setNotebookConf",  'setNotebookConf')
	this.set("POST", "/api/notebook/createNotebook", 'createNotebook')
	this.set("POST", "/api/notebook/removeNotebook",  'removeNotebook')
	this.set("POST", "/api/notebook/renameNotebook",  'renameNotebook')
	this.set("POST", "/api/notebook/changeSortNotebook",  'changeSortNotebook')
	this.set("POST", "/api/notebook/setNotebookIcon", 'setNotebookIcon')
    //文档树相关
	this.set("POST", "/api/filetree/searchDocs", 'searchDocs')
	this.set("POST", "/api/filetree/listDocsByPath",  'listDocsByPath')
	this.set("POST", "/api/filetree/getDoc",  'getDoc')
	this.set("POST", "/api/filetree/getDocNameTemplate",  'getDocNameTemplate')
	this.set("POST", "/api/filetree/changeSort",  'changeSort')
	this.set("POST", "/api/filetree/lockFile", 'lockFile')
	this.set("POST", "/api/filetree/createDocWithMd",   'createDocWithMd')
	this.set("POST", "/api/filetree/createDailyNote",  'createDailyNote')
	this.set("POST", "/api/filetree/createDoc",  'createDoc')
	this.set("POST", "/api/filetree/renameDoc",  'renameDoc')
	this.set("POST", "/api/filetree/removeDoc", 'removeDoc')
	this.set("POST", "/api/filetree/moveDoc", 'moveDoc')
	this.set("POST", "/api/filetree/duplicateDoc",  'duplicateDoc')
	this.set("POST", "/api/filetree/getHPathByPath", 'getHPathByPath')
	this.set("POST", "/api/filetree/getHPathByID", 'getHPathByID')
	this.set("POST", "/api/filetree/getFullHPathByID",  'getFullHPathByID')
	this.set("POST", "/api/filetree/doc2Heading",  'doc2Heading')
	this.set("POST", "/api/filetree/heading2Doc",  'heading2Doc')
	this.set("POST", "/api/filetree/li2Doc", 'li2Doc')
	this.set("POST", "/api/filetree/refreshFiletree", 'refreshFiletree')
    //格式化相关
	this.set("POST", "/api/format/autoSpace",  'autoSpace')
	this.set("POST", "/api/format/netImg2LocalAssets", 'netImg2LocalAssets')
    //历史相关
	this.set("POST", "/api/history/getNotebookHistory",  'getNotebookHistory')
	this.set("POST", "/api/history/rollbackNotebookHistory",  'rollbackNotebookHistory')
	this.set("POST", "/api/history/getAssetsHistory", 'getAssetsHistory')
	this.set("POST", "/api/history/rollbackAssetsHistory",'rollbackAssetsHistory')
	this.set("POST", "/api/history/getDocHistory",  'getDocHistory')
	this.set("POST", "/api/history/getDocHistoryContent", 'getDocHistoryContent')
	this.set("POST", "/api/history/rollbackDocHistory",  'rollbackDocHistory')
	this.set("POST", "/api/history/clearWorkspaceHistory", 'clearWorkspaceHistory')
    //大纲、书签与标签相关
	this.set("POST", "/api/outline/getDocOutline", 'getDocOutline')
	this.set("POST", "/api/bookmark/getBookmark", 'getBookmark')
	this.set("POST", "/api/bookmark/renameBookmark",  'renameBookmark')
	this.set("POST", "/api/tag/getTag", 'getTag')
	this.set("POST", "/api/tag/renameTag", 'renameTag')
	this.set("POST", "/api/tag/removeTag",  'removeTag')
    //lute相关
	this.set("POST", "/api/lute/spinBlockDOM",  'spinBlockDOM') // 未测试
	this.set("POST", "/api/lute/html2BlockDOM", 'html2BlockDOM')
	this.set("POST", "/api/lute/copyStdMarkdown",  'copyStdMarkdown')
	this.set("POST", "/api/query/sql",  'sql')
	this.set("POST", "/api/query/sql",  'SQL')
    //搜索相关
	this.set("POST", "/api/search/searchTag", 'searchTag')
	this.set("POST", "/api/search/searchTemplate", 'searchTemplate')
	this.set("POST", "/api/search/searchWidget",  'searchWidget')
	this.set("POST", "/api/search/searchRefBlock",  'searchRefBlock')
	this.set("POST", "/api/search/searchEmbedBlock", 'searchEmbedBlock')
	this.set("POST", "/api/search/fullTextSearchBlock",  'fullTextSearchBlock')
	this.set("POST", "/api/search/searchAsset", 'searchAsset')
	this.set("POST", "/api/search/findReplace",'findReplace')
    //块相关
	this.set("POST", "/api/block/getBlockInfo",  'getBlockInfo')
	this.set("POST", "/api/block/getBlockDOM",  'getBlockDOM')
	this.set("POST", "/api/block/getBlockBreadcrumb", 'getBlockBreadcrumb')
	this.set("POST", "/api/block/getRefIDs",  'getRefIDs')
	this.set("POST", "/api/block/getRefIDsByFileAnnotationID",  'getRefIDsByFileAnnotationID')
	this.set("POST", "/api/block/getBlockDefIDsByRefText",  'getBlockDefIDsByRefText')
	this.set("POST", "/api/block/getRefText",  'getRefText')
	this.set("POST", "/api/block/getBlockWordCount",'getBlockWordCount')
	this.set("POST", "/api/block/getRecentUpdatedBlocks",  'getRecentUpdatedBlocks')
	this.set("POST", "/api/block/getDocInfo",  'getDocInfo')
	this.set("POST", "/api/block/checkBlockExist",  'checkBlockExist')
	this.set("POST", "/api/block/checkBlockFold",'checkBlockFold')
	this.set("POST", "/api/block/insertBlock",  'insertBlock')
	this.set("POST", "/api/block/prependBlock",  'prependBlock')
	this.set("POST", "/api/block/appendBlock",  'appendBlock')
	this.set("POST", "/api/block/updateBlock",  'updateBlock')
	this.set("POST", "/api/block/deleteBlock", 'deleteBlock')
	this.set("POST", "/api/block/setBlockReminder", 'setBlockReminder')
    //文件相关
	this.set("POST", "/api/file/getFile", 'getFile')
	this.set("POST", "/api/file/putFile", 'putFile')
    //引用相关
	this.set("POST", "/api/ref/refreshBacklink", 'refreshBacklink')
	this.set("POST", "/api/ref/getBacklink", 'getBacklink')
	this.set("POST", "/api/ref/createBacklink", 'createBacklink')
    //属性相关
	this.set("POST", "/api/attr/getBookmarkLabels",  'getBookmarkLabels')
	this.set("POST", "/api/attr/resetBlockAttrs", 'resetBlockAttrs')
	this.set("POST", "/api/attr/setBlockAttrs",'setBlockAttrs')
	this.set("POST", "/api/attr/getBlockAttrs", 'getBlockAttrs')
    //云端相关
	this.set("POST", "/api/cloud/getCloudSpace",  'getCloudSpace')
    //备份相关
	this.set("POST", "/api/backup/getLocalBackup",  'getLocalBackup')
	this.set("POST", "/api/backup/createLocalBackup", 'createLocalBackup')
	this.set("POST", "/api/backup/recoverLocalBackup",'recoverLocalBackup')
	this.set("POST", "/api/backup/uploadLocalBackup", 'uploadLocalBackup')
	this.set("POST", "/api/backup/downloadCloudBackup",  'downloadCloudBackup')
	this.set("POST", "/api/backup/removeCloudBackup",  'removeCloudBackup')
    //同步相关
	this.set("POST", "/api/sync/setSyncEnable",  'setSyncEnable')
	this.set("POST", "/api/sync/setCloudSyncDir",  'setCloudSyncDir')
	this.set("POST", "/api/sync/createCloudSyncDir", 'createCloudSyncDir')
	this.set("POST", "/api/sync/removeCloudSyncDir",'removeCloudSyncDir')
	this.set("POST", "/api/sync/listCloudSyncDir", 'listCloudSyncDir')
	this.set("POST", "/api/sync/performSync", 'performSync')
	this.set("POST", "/api/sync/performBootSync", 'performBootSync')
	this.set("POST", "/api/sync/getBootSync",  'getBootSync')
	this.set("POST", "/api/sync/getSyncDirection",  'getSyncDirection')
    //收集箱相关
	this.set("POST", "/api/inbox/getShorthands", 'getShorthands')
	this.set("POST", "/api/inbox/removeShorthands",  'removeShorthands')
    
	this.set("POST", "/api/extension/copy", 'extensionCopy')

	this.set("POST", "/api/clipboard/readFilePaths",'readFilePaths')
    //附件相关
	this.set("POST", "/api/asset/uploadCloud",  'uploadCloud')
	this.set("POST", "/api/asset/insertLocalAssets",  'insertLocalAssets')
	this.set("POST", "/api/asset/resolveAssetPath", 'resolveAssetPath')
	this.set("POST", "/api/asset/upload",'upload')
	this.set("POST", "/api/asset/setFileAnnotation", 'setFileAnnotation')
	this.set("POST", "/api/asset/getFileAnnotation",  'getFileAnnotation')
	this.set("POST", "/api/asset/getUnusedAssets",  'getUnusedAssets')
	this.set("POST", "/api/asset/removeUnusedAsset", 'removeUnusedAsset')
	this.set("POST", "/api/asset/removeUnusedAssets",  'removeUnusedAssets')
	this.set("POST", "/api/asset/getDocImageAssets",  'getDocImageAssets')
    //导出相关
	this.set("POST", "/api/export/batchExportMd",  'batchExportMd')
	this.set("POST", "/api/export/exportMd",  'exportMd')
	this.set("POST", "/api/export/exportSY",  'exportSY')
	this.set("POST", "/api/export/exportMdContent",  'exportMdContent')
	this.set("POST", "/api/export/exportHTML",  'exportHTML')
	this.set("POST", "/api/export/exportMdHTML", 'exportMdHTML')
	this.set("POST", "/api/export/exportDocx",  'exportDocx')
	this.set("POST", "/api/export/addPDFOutline",  'addPDFOutline')
	this.set("POST", "/api/export/preview",  'exportPreview')
	this.set("POST", "/api/export/exportData",  'exportData')
	this.set("POST", "/api/export/exportDataInFolder",  'exportDataInFolder')
    //导入相关
	this.set("POST", "/api/import/importStdMd", 'importStdMd')
	this.set("POST", "/api/import/importData", 'importData')
	this.set("POST", "/api/import/importSY",  'importSY')

	this.set("POST", "/api/template/render", 'renderTemplate')
	this.set("POST", "/api/template/docSaveAsTemplate",  'docSaveAsTemplate')

	this.set("POST", "/api/transactions",  'performTransactions')
    //设置相关
	this.set("POST", "/api/setting/setAccount",  'setAccount')
	this.set("POST", "/api/setting/setEditor",  'setEditor')
	this.set("POST", "/api/setting/setExport",  'setExport')
	this.set("POST", "/api/setting/setFiletree",  'setFiletree')
	this.set("POST", "/api/setting/setSearch",  'setSearch')
	this.set("POST", "/api/setting/setKeymap",  'setKeymap')
	this.set("POST", "/api/setting/setAppearance",  'setAppearance')
	this.set("POST", "/api/setting/getCloudUser",  'getCloudUser')
	this.set("POST", "/api/setting/logoutCloudUser",  'logoutCloudUser')
	this.set("POST", "/api/setting/login2faCloudUser", 'login2faCloudUser')
	this.set("POST", "/api/setting/getCustomCSS",  'getCustomCSS')
	this.set("POST", "/api/setting/setCustomCSS", 'setCustomCSS')
	this.set("POST", "/api/setting/setEmoji",  'setEmoji')
	this.set("POST", "/api/setting/setSearchCaseSensitive",  'setSearchCaseSensitive')
    //图谱相关
	this.set("POST", "/api/graph/resetGraph",  'resetGraph')
	this.set("POST", "/api/graph/resetLocalGraph", 'resetLocalGraph')
	this.set("POST", "/api/graph/getGraph",  'getGraph')
	this.set("POST", "/api/graph/getLocalGraph",  'getLocalGraph')
    //集市相关
	this.set("POST", "/api/bazaar/getBazaarWidget",  'getBazaarWidget')
	this.set("POST", "/api/bazaar/installBazaarWidget", 'installBazaarWidget')
	this.set("POST", "/api/bazaar/uninstallBazaarWidget", 'uninstallBazaarWidget')
	this.set("POST", "/api/bazaar/getBazaarIcon",  'getBazaarIcon')
	this.set("POST", "/api/bazaar/installBazaarIcon",  'installBazaarIcon')
	this.set("POST", "/api/bazaar/uninstallBazaarIcon",  'uninstallBazaarIcon')
	this.set("POST", "/api/bazaar/getBazaarTemplate",  'getBazaarTemplate')
	this.set("POST", "/api/bazaar/installBazaarTemplate", 'installBazaarTemplate')
	this.set("POST", "/api/bazaar/uninstallBazaarTemplate", 'uninstallBazaarTemplate')
	this.set("POST", "/api/bazaar/getBazaarTheme",  'getBazaarTheme')
	this.set("POST", "/api/bazaar/installBazaarTheme", 'installBazaarTheme')
	this.set("POST", "/api/bazaar/uninstallBazaarTheme", 'uninstallBazaarTheme')
	this.set("POST", "/api/bazaar/getBazaarPackageREAME",  'getBazaarPackageREAME')
}
    async set(方法,路径,英文名,中文名){
        this[英文名] =this.生成方法(方法,路径).bind(this)
        中文名?this[中文名] = this[英文名]:null
    }
    生成方法(方法,路径){
        return async function(data,apitoken=""){
            let resData  = null
			if (data instanceof FormData) {
				data = data;
			} else {
				data = JSON.stringify(data);
			}            
			await fetch(this.思源伺服地址+路径,{
                body: data,
                method:方法,
                headers:{
                    'Authorization': 'Token '+ apitoken,
                    'user-agent': 'Mozilla Mobile/4.0 MDN Example',
                },
            }).then(function(response){resData= response.json()})
            let realData = await resData
            return realData.data?realData.data:null    
        }
    }
}
