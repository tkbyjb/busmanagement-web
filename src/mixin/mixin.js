export const manageMixin = {
    data() {
        return {
            tableData: [],
            pageConfig: {
                resultSize: null,
                pageNum: null,
                pageSize: 10,
                pageIndex: 1,
            },
            selectRows: [],
            vc: this,
        }
    }
}