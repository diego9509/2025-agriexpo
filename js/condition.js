class RequiredRenderer {
    eGui;

    // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
    init(params) {
        let span = document.createElement('span');
        let value = document.createElement('p');
        if (params.data.requiredYn) {
            span.classList.add('is-required');
            span.innerText="(필수)";
        } else {
            span.classList.add('is-optional');
            span.innerText="(선택)";
        };

        value.textContent = params.value;
        this.eGui = document.createElement('div');
        this.eGui.setAttribute('style', 'display: flex;  gap: .25rem; height: 100%; width: 100%; align-items: center')
        this.eGui.appendChild(value)
        this.eGui.appendChild(span)
    }

    // Required: Return the DOM element of the component, this is what the grid puts into the cell
    getGui() {
        return this.eGui;
    }

    // Required: Get the cell to refresh.
    refresh(params) {
        return false
    }
}

class ButtonRenderer {
    eGui;

    init(param) {
        this.eGui = document.createElement('button');
        this.eGui.classList.add('is-primary')
        if (param.value) {
            this.eGui.innerText='완료/수정'
            this.eGui.classList.add('is-complete')
        } else {
            this.eGui.innerText='신청하기'
        }
    }

    getGui() {
        return this.eGui
    }
}

let today = new Date();

const gridOptions = {
    // Row Data: The data to be displayed.
    rowData: [
        { 신청항목: "기본정보", requiredYn: true, 신청기한: today, 신청현황: true },
        { 신청항목: "전시부스 신청", requiredYn: true, 신청기한: today, 신청현황: true },
        { 신청항목: "유틸리티 신청", requiredYn: false, 신청기한: today, 신청현황: true },
        { 신청항목: "위험중량물 신고", requiredYn: false, 신청기한: today, 신청현황: false },
        { 신청항목: "출입증 신청", requiredYn: false, 신청기한: today, 신청현황: false },
        { 신청항목: "전시 비품 신청", requiredYn: false, 신청기한: today, 신청현황: false },
        { 신청항목: "등록 완료", requiredYn: true, 신청기한: today, 신청현황: true },
    ],
    // Column Definitions: Defines the columns to be displayed.
    columnDefs: [
        {   
            field: "신청항목",
            cellRenderer: RequiredRenderer,
            resizable: false,
            flex: 2,
            cellStyle: {textAlign: "center"}
        },
        { 
            field: "신청기한",
            resizable: false,
        },
        { 
            field: "신청현황",
            resizable: false,
            cellRenderer: ButtonRenderer,
            autoHeight: true
        },
    ],
    defaultColDef: { 
        headerClass: "align-center", cellClass: "align-center" 
    },
    domLayout: "autoHeight",
};

const myGridElement = document.querySelector('#grid');
agGrid.createGrid(myGridElement, gridOptions);