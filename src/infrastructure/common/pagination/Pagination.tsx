import { Pagination, Select } from "antd";
import "../../../assets/styles/components/pagination.css"
import Constants from '../../../core/common/constants';
type Props = {
    total: number,
    currentPage: number,
    onChangePage: any,
    pageSize: number,
    onChangeSize: any,
    disabled: boolean,
    isClient?: boolean,
}
export const PaginationCommon = (props: Props) => {
    const {
        total,
        currentPage = 1,
        onChangePage,
        pageSize,
        onChangeSize,
        disabled = false,
        isClient = false,
    } = props

    const dataPagination: any[] = isClient ? Constants.PaginationClientConfigs.PageSizeList : Constants.PaginationConfigs.PageSizeList;

    return (
        <div className="w-full flex justify-between pt-4 pb-2 gap-2 container-pagination">
            <Pagination current={currentPage} total={total} showSizeChanger={false} pageSize={pageSize} onChange={onChangePage} />
            <div className="flex align-center gap-2">
                <div className="show-title mr-4">Số bản ghi mỗi trang</div>
                <div className="select-page-size">
                    <Select
                        value={pageSize}
                        showSearch
                        className="w-full"
                        onChange={onChangeSize}
                        disabled={disabled}
                        getPopupContainer={(trigger) => trigger.parentNode}
                    >
                        {
                            dataPagination.length && dataPagination.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.value}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </Select.Option>
                                );
                            })
                        }
                    </Select>
                </div>
                {/* <div className="m-auto text-15" style={{ color: "#1E2028" }}>{`${currentPage * pageSize - pageSize + 1} - ${currentPage * pageSize > total ? pageSize : (currentPage * pageSize)} of ${total}`}</div> */}

            </div>
        </div>
    );
};

