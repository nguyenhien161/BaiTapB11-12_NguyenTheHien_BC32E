function layDanhSachKhachHangApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',//Đường dẫn cung cấp
        method: 'Get'//backend cung cấp
    });


    promise.then(function (result) {
        console.log(result.data);
        //sau khi lấy dữ liệu backend về dùng dữ liệu để tạo ra tr trên table
        renderKhachHang(result.data);
    });
    promise.catch(function (err) {

    });
}
//Gọi hàm lấy dữ liệu từ server 
window.onload = function () {
    layDanhSachKhachHangApi();
}
document.querySelector('#btnCreate').onclick = function () {
    var khachHang = new KhachHang();
    khachHang.id = document.querySelector('#id').value;
    khachHang.name = document.querySelector('#name').value;
    khachHang.price = document.querySelector('#price_1').value;
    khachHang.image = document.querySelector('#image').value;
    khachHang.productType = document.querySelector('#mobile').value;
    khachHang.decription = document.querySelector('#price_2').value;



    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: khachHang //dữ liệu gửi đi

    });

    promise.then(function (result) {
        console.log(result.data);
    });
    promise.catch(function (error) {
        console.log(error)
    });
}
function renderKhachHang(arrKhachHang) {
    var html = '';
    for (var i = 0; i < arrKhachHang.length; i++) {
        var kh = arrKhachHang[i];
        html += `
            <tr>
                <td>${kh.id}</td>
                <td><img src="${kh.img}" class="w-25"</td>
                <td>${kh.name}</td>
                <td>${kh.price}</td>
                <td>${kh.decription}</td>
                <td>${kh.type}</td>
                <td>
                    <button class="btn btn-primary mr-2" onclick="chinhSua('${kh.id}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${kh.id}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblShop').innerHTML = html;

}

function xoaSinhVien(maIDClick) {
    alert(maIDClick);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + maIDClick,
        method: 'DELETE',
    })


    //Thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachKhachHangApi();
    });

    //thất bại
    promise.catch(function (err) {
        console.log(err);
    })
}

function chinhSua(maSinhVien) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + maSinhVien,
    });

    promise.then(function (result) {
        var khachHang = result.data;
        document.querySelector('#id').value = khachHang.id;
        document.querySelector('#name').value = khachHang.name;
        document.querySelector('#price_1').value = khachHang.price;
        document.querySelector('#image').value = khachHang.image;
        document.querySelector('#mobile').value = khachHang.productType;
        document.querySelector('#price_2').value = khachHang.decription;
    })
    promise.catch(function (err) {
        console.log(err);
    })
}

document.querySelector('#btnUpdate').omlick = function () {
    var khachHangUpdate = new KhachHang()
    khachHangUpdate.id = document.querySelector('#id').value;
    khachHangUpdate.name = document.querySelector('#name').value;
    khachHangUpdate.price = document.querySelector('#price_1').value;
    khachHangUpdate.image = document.querySelector('#image').value;
    khachHangUpdate.productType = document.querySelector('#mobile').value;
    khachHangUpdate.decription = document.querySelector('#price_2').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + khachHangUpdate.maSinhVien,
        method: 'POT',
        data: khachHangUpdate
    });


    promise.then(function (result) {
        //thành công
        console.log(result.data);
        layDanhSachKhachHangApi();
    })
    promise.catch(function (err) {
        console.log(err);
    })
}