import React from 'react';
import { X, Download, Share2, Printer, Shield, CheckCircle, FileText } from 'lucide-react';

export const GazettePdfModal = ({ isOpen, onClose, documentTitle, orderNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden z-10 animate-slide-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-400 font-mono">
                {orderNumber || 'GAZETTE NOTIFICATION S.O. 3192(E)'}
              </div>
              <div className="text-[11px] text-slate-300">
                The Gazette of India: Extraordinary • Part II—Sec. 3(ii)
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Toolbar */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Page 1 of 4</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Digitally Signed & Certified</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => alert("Downloading certified statutory copy...")}
              className="px-3 py-1 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 flex items-center space-x-1 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>Download PDF</span>
            </button>
            <button 
              onClick={() => window.print()}
              className="p-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Official Document Rendering */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 font-serif text-slate-800 leading-relaxed text-sm">
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 shadow-md border border-slate-200 space-y-6">
            
            {/* Gov Emblem & Header */}
            <div className="text-center space-y-2 pb-6 border-b-2 border-slate-900">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-800 border border-slate-300">
                सत्यमेव जयते
              </div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                The Gazette of India
              </h1>
              <div className="text-xs italic text-slate-600">
                EXTRAORDINARY • PUBLISHED BY AUTHORITY
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                NEW DELHI, WEDNESDAY, OCTOBER 11, 2023 / ASVINA 19, 1945
              </div>
            </div>

            {/* Ministry Decree */}
            <div className="text-center space-y-1 text-xs">
              <div className="font-bold uppercase tracking-wide">
                MINISTRY OF COMMERCE AND INDUSTRY
              </div>
              <div className="text-slate-600">
                (Department for Promotion of Industry and Internal Trade)
              </div>
              <div className="font-mono font-bold text-slate-800 pt-1">
                ORDER — S.O. 3192(E)
              </div>
            </div>

            {/* Document Statutory Text */}
            <div className="space-y-4 text-xs font-sans text-slate-700 leading-normal text-justify">
              <p>
                <strong>S.O. 3192(E).</strong>—In exercise of the powers conferred by section 16 of the Bureau of Indian Standards Act, 2016 (11 of 2016), the Central Government, after consulting the Bureau of Indian Standards, hereby makes the following Order, namely:—
              </p>
              
              <p>
                <strong>1. Short title and commencement.</strong>—(1) This Order may be called the <em>Vacuum Flasks and Insulated Beverage Containers (Quality Control) Order, 2023</em>.<br/>
                (2) It shall come into force on the expiry of six months from the date of its publication in the Official Gazette.
              </p>

              <p>
                <strong>2. Compulsory use of Standard Mark.</strong>—Goods or articles specified in column (1) of the Table shall conform to the corresponding Indian Standard <strong>IS 17803:2022</strong> specified in column (2) of the said Table and shall bear the Standard Mark under a licence from the Bureau of Indian Standards as per Scheme-I of Schedule-II of the Bureau of Indian Standards (Conformity Assessment) Regulations, 2018.
              </p>

              {/* Table in Gazette */}
              <div className="border border-slate-300 my-4">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 font-bold">
                    <tr>
                      <th className="p-2 border-r border-slate-300">Goods or Article (1)</th>
                      <th className="p-2 border-r border-slate-300">Indian Standard (2)</th>
                      <th className="p-2">Title of Indian Standard (3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 border-r border-slate-300 font-medium">Stainless Steel Vacuum Flasks</td>
                      <td className="p-2 border-r border-slate-300 font-mono font-bold text-sky-700">IS 17803:2022</td>
                      <td className="p-2">Stainless steel vacuum flasks, insulated containers and tableware.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                [F. No. P-29026/18/2023-LEI] • SANJIV, Jt. Secy.
              </p>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono text-[11px]">Source: eGazette Portal, Gov of India</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
